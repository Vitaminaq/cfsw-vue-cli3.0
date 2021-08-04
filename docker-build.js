const inquirer = require('inquirer');
const fs = require('fs');
const exec = require('child_process').execSync;

const FILENAME = 'docker-log';
const COMPOSENAME = 'docker-compose.yml';

const dockerBuild = () => {
    return exec('docker-compose up --build', {
        stdio: 'inherit'
    });
}
const login = (cb) => {
    inquirer.prompt([{
        type: "input", // 密码为密文输入
        message: "请输入用户名：",
        name: "username"
    }, {
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "password"
    }]).then(r => {
        // 先登录
        try {
            exec(`docker login -u=${r.username} -p=${r.password}`, {
                stdio: 'inherit'
            })
            cb();
        } catch(e) {
            login();
        }
    })
}

let versionType = 0; // 0 原版本 | 小版本 | 大版本
let versionDes = ''; // 版本描述
let versionNum = '1.0.0'; // 当前版本号
let envMaps = ['pro', 'beta', 'dev'];
let vTypeMaps = ['原版本', '小版本', '大版本'];

// 生成docker-log
const createDockerLog = (envText) => {
    let vNum;
    try {
        const r = fs.readFileSync(FILENAME, 'utf8');
        const arr = r.split('\n');
        const len = arr.length;
        const version = arr[len - 3];
        vNum = version.split('-')[1];
        const va = vNum.split('.');
        console.log(va);
        switch (versionType) {
            case 0:
                versionNum = vNum;
                break;
            case 1:
                versionNum = `${va[0]}.${va[1]}.${++va[2]}`;
                break;
            case 2:
                versionNum = `${++va[0]}.${va[1]}.${va[2]}`;
                break;
        }
        fs.appendFileSync(FILENAME, `${envText}-${versionNum}\n${versionDes}\n`, 'utf8');
    } catch (e) {
        fs.writeFileSync(FILENAME, `${envText}-${versionNum}\n${versionDes}\n`);
    }
    // 把最新信息写入compose中
    const cr = fs.readFileSync(COMPOSENAME, 'utf8');
    fs.writeFileSync(COMPOSENAME, cr.replace(vNum, versionNum));
}

const clearBuild = () => {
    versionNum = '';
    versionType = 0;
    versionDes = '';
}

const createCompose = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([{
            type: 'list',
            message: '请选择运行环境:',
            name: 'env',
            choices: envMaps
        }]).then(r => {
            inquirer.prompt([{
                type: 'list',
                message: '请选择发布的版本类型:',
                name: 'versionType',
                choices: ['原版本', '小版本', '大版本']
            }]).then(r1 => {
                versionType = vTypeMaps.indexOf(r1.versionType);
                inquirer.prompt([{
                    type: "input", // 密码为密文输入
                    message: "请填写当前版本描述：",
                    name: "des"
                }]).then(r2 => {
                    versionDes = r2.des;
                    createDockerLog(r.env);
                    resolve();
                })
            })
        }) 
    });
}

const dockerPush = () => {
    try {
        exec(`docker push 1109614355/node-cfsw:${ versionNum }`, {
            stdio: 'inherit'
        });
        clearBuild();
    } catch(e) {
        login(dockerPush);
    }
}

const start = async () => {
    // 先生成最新compose
    await createCompose();
    // 先用本地docker打包
    dockerBuild();
    // 推送
    dockerPush();
}

start();
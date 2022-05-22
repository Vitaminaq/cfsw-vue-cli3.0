import glob from 'glob';
import jiti from 'jiti';
import path from 'path';
import axios from 'axios';
import fse from 'fs-extra';

const root = process.cwd();

const fetch = () => {
    return axios.create({
        baseURL: 'http://127.0.0.1:3002'
    });
};

const translateLanguages = ['EN_US', 'ZH_TW', 'ZH_HK', 'JA_JP'];

const translateLanguagesMap = {
    EN_US: 'en',
    ZH_TW: 'cht',
    ZH_HK: 'cht',
    JA_JP: 'ja'
};

glob(`${root}/!(node_modules)/**/ZH_CN.{ts,js,json}`, {}, async (err, files) => {
    if (err) throw Error('glob：查找文件失败');

    const pathMap = new Map();
    const map = new Map();

    const list = [];

    files.forEach(filePath => {
        let content;
        if (filePath.endsWith('.json')) {
            content = require(filePath);
        } else {
            const arr = filePath.split('/ZH_CN');
            content = jiti(path.resolve(arr[0]))('./ZH_CN').default;
        }
        list.push(...Object.keys(content).filter(k =>
            !map.has(content[k]) || map.get(content[k]) !== k
        ).map(key => {
            map.set(content[key], key);
            return {
                key,
                ZH_CN: content[key]
            };
        }));
        pathMap.set(filePath, content);
    });

    const r = await fetch().post('/api/i18n/upload', { list, translate: true });
    const resultMap = new Map();
    r.data.data.forEach(i => {
        const { key, ZH_CN } = i;
        resultMap.set(`${key}${ZH_CN}`, i);
    });

    pathMap.forEach((value, key) => {
        let str = 'export default {\n';
        Object.keys(value).forEach((i) => {
            const mapKey = `${i}${value[i]}`;
            if (resultMap.has(mapKey)) {
                str = `${str}\t${i}: "${resultMap.get(mapKey).EN_US.value}",\n`
            } else {
                str = `${str}\t${i}: '\"\"',\n`
            }
        });
        fse.outputFile(path.resolve(key.replace('ZH_CN', 'EN_US')), `${str}}\n`);
    });
});
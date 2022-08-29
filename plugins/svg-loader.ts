import type { Plugin, Alias, AliasOptions } from 'vite';
import fs from 'node:fs';
import nodePath from 'node:path';
import { compileTemplate } from '@vue/compiler-sfc';
import { optimize } from 'svgo';
interface SvgLoaderOptions {
    maxSize: number; // 0 为关闭
    svgo: boolean; // 是否开启svg压缩
    svgoConfig: any;
}
export default function svgLoader(opts: Partial<SvgLoaderOptions> = {}): Plugin[] {
    const options = { maxSize: 10, svgoConfig: {}, svgo: false, ...opts } as SvgLoaderOptions;
    const { svgoConfig, svgo } = options;
    const svgRegex = /\.svg$/;
    const vueRegex = /\.vue$/;
    let alias: Alias[] = [];
    // const readSvg = (path: string) => {
    //     let svg, size = 0;
    //     try {
    //         svg = fs.readFileSync(path, 'utf-8');
    //         const { size: s } = fs.statSync(path);
    //         size = s;
    //         inlineSvgsMap.
    //     } catch (e) {
    //         console.warn(
    //             '\n',
    //             `${path} couldn't be loaded by vite-svg-loader, fallback to default loader`
    //         );
    //         return;
    //     }
    // }
    return [
        {
            name: 'svg-loader-pre',
            enforce: 'pre',
            configResolved(config) {
                alias = config.resolve.alias || [];
                console.log(alias, '11111111111111111111');
            },
            async load(id) {
                if (!id.match(svgRegex)) return;
                const [path, query] = id.split('?', 2);
                let svg;
                let size = 0;
                try {
                    svg = fs.readFileSync(path, 'utf-8');
                    const { size: s } = fs.statSync(path);
                    size = s;
                } catch (e) {
                    console.warn(
                        '\n',
                        `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`
                    );
                    return;
                }
                if (svgo !== false && query !== 'skipsvgo') {
                    svg = optimize(svg, svgoConfig).data || svg;
                }
                if (query === 'component') {
                    const { code } = compileTemplate({
                        id: JSON.stringify(id),
                        source: svg,
                        filename: path,
                        transformAssetUrls: false,
                    });
                    return `${code}\nexport default { render: render }`;
                }
                if (size < options.maxSize * 1024) {
                    return `export default ${JSON.stringify(svg)}`;
                }
                return;
            },
            transform(code, id) {
                const [path] = id.split('?', 2);
                if (path.match(vueRegex)) {
                    const matchs = (
                        code.match(
                            /<img[\s\S]*?src=[\"|\']?([\s\S]*?)[\"|\']?[\s\S]*?>/gi
                        ) || []
                    ).filter((i) => i.match(/\.svg/));
                    if (matchs.length) {
                        matchs.forEach((i) => {
                            code = code.replace(i, (substring) => {
                                const content = substring
                                    .replace('<img', '')
                                    .replace(/\/\>$/, '')
                                    .replace(/\>$/, '').replace('src', 'data-src');
                                const { ast } = compileTemplate({
                                    id: JSON.stringify(id),
                                    source: substring,
                                    filename: path,
                                    transformAssetUrls: true,
                                });
                                if (!ast) return code;
                                const imgPath = ast.imports[0].path;
                                let imgCompletePath = '';
                                const alia = alias.filter((i) =>
                                    imgPath.match(new RegExp(`^${i.find}`))
                                );
                                if (alia.length) {
                                    imgCompletePath = nodePath.join(
                                        alia[0].replacement,
                                        imgPath.replace(
                                            new RegExp(`^${alia[0].find}`),
                                            ''
                                        )
                                    );
                                } else {
                                    imgCompletePath = nodePath.resolve(
                                        id,
                                        /^\.\./.test(imgPath)
                                            ? imgPath
                                            : `.${imgPath}`
                                    );
                                }
                                let svg = fs.readFileSync(imgCompletePath, 'utf-8');
                                svg = optimize(svg, svgoConfig).data
                                console.log(svg);
                                //     return `<svg ${content} width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                //     <g clip-path="url(#clip90_1977)">
                                //         <path d="M11 3L9 3L9 9L3 9L3 11L9 11L9 17L11 17L11 11L17 11L17 9L11 9L11 3Z" fill-rule="evenodd" clip-rule="evenodd" fill="#565CFF" fill-opacity="1.000000"/>
                                //     </g>
                                //     <defs>
                                //         <clipPath id="clip90_1977">
                                //             <rect width="20.000000" height="20.000000" fill="white"/>
                                //         </clipPath>
                                //     </defs>
                                // </svg>`;
                                return svg.replace('<svg', `<svg ${content} `);
                            });
                        });
                        console.log(code, '77777777777777777777777777777777777777');
                    }
                }
                return code;
            },
        },
    ];
}
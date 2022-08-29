import type { Plugin, Alias, AliasOptions } from 'vite';
import fs from 'node:fs';
import nodePath from 'node:path';
import { compileTemplate } from '@vue/compiler-sfc';
import { optimize } from 'svgo';
import { parser, NodeTag } from 'posthtml-parser'
import { render } from 'posthtml-render';
import { normalizePath } from 'vite';

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
                // 处理import
                const [path, query] = id.split('?', 2);
                if (!path.match(svgRegex)) return;
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
                console.log(query, 'iiiiiiiiiiiiiiii');
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
                return '';
            },
            transform(code, id) {
                const [path] = id.split('?', 2);
                // 替换template里面
                if (path.match(vueRegex)) {
                    const matchs = (
                        code.match(
                            /<img[\s\S]*?src=[\"|\']?([\s\S]*?)[\"|\']?[\s\S]*?>/gi
                        ) || []
                    ).filter((i) => i.match(/\.svg/));
                    if (matchs.length) {
                        matchs.forEach((i) => {
                            code = code.replace(i, (substring) => {
                                const { attrs } = parser(substring)[0] as NodeTag;
                                if (!attrs) return substring;
                                const { src } = attrs;
                                // console.log(parser(substring), 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
                                const imgPath = src as string;
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
                                        `../${normalizePath(imgPath)}`
                                    );
                                }
                                let svg = fs.readFileSync(imgCompletePath, 'utf-8');
                                svg = optimize(svg, svgoConfig).data

                                const svgParse = (parser(svg) as NodeTag[]).filter(i => i.tag && i.tag === 'svg')[0];
                                if (!svgParse || !svgParse.attrs) return substring;
                                Object.assign(svgParse.attrs, attrs);
                                svgParse.attrs.src && delete svgParse.attrs.src;
                                return render(svgParse);
                            });
                        });
                        // const { code: pageCode } = compileTemplate({
                        //     id: JSON.stringify(id),
                        //     source: code,
                        //     filename: path,
                        //     transformAssetUrls: false,
                        // });
                        // console.log(pageCode);
                    }
                }
                return code;
            },
        }, {
            name: 'svg-loader-post',
            transform(code, id) {
                const [path] = id.split('?', 2);
                if (path.match(/index\.vue$/)) {
                    // console.log(code, '77777777777777777777777777');
                }
                return code;
            }
        }
    ];
}
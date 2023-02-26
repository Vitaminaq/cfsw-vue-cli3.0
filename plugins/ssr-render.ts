import type { PluginOption } from 'vite';
import render from '@skatejs/ssr';

export function ssrRender(options: any): PluginOption {
  return {
    name: 'my-ssr',
    enforce: 'pre',
    resolveId(id) {
      if (id.match('custom-')) return;
    },
    async transform(code: any, id: any, options: any) {
      console.log(code.match('<custom-button />', '7777777777'));
      if (options?.ssr && code.match('<custom-button />')) {
        console.log(id, 'ooooooooooooooooooo11111111');
        const res = await import('../src/custom-components/custom-button');

        const html = await render(new res.default())
        console.log(html, 'ooooooooooooooooooo');
        return {
          code: code.replace('<custom-button />', html)
        }
      }
    },
  }
}
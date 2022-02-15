/**
 * 按钮所需参数
 */
declare namespace MyButton {
  export interface BtnStyle {
    width?: string;
    height?: string;
    fontSize?: string;
  }
  export interface Button<BtnStyle> {
    disabled: boolean;
    value: string;
    btnStyle?: BtnStyle;
  }
}

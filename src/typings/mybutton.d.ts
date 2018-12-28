/**
 * 按钮所需参数
*/
declare namespace MyButton {
    export interface BtnStyle {
        width?: String,
        height?: String,
        fontSize?: String
    }
    export interface Button<BtnStyle> {
            disabled: Boolean,
            value: String,
            btnStyle?: BtnStyle
    }
}

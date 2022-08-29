// /api/user/pub/{path}/{object_id}.get
declare namespace Api.User.Pub.Path.ObjectId {
    export interface APIContent {
        params: Params;
        response: any;
    }

    export interface Params {
        object_id: string;
        path: string;
    }
    export type Response = any;
}
// /api/user/user/manager/wechat/head-img.post
declare namespace Api.User.User.Manager.Wechat.HeadImg {
    export type Params = any;
    export interface APIContent {
        /**
         * OK
         */
        response: Response;
        params: any;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/board/callback.post
declare namespace Api.User.User.Wechat.Board.Callback {
    export type Params = any;
    export interface APIContent {
        /**
         * OK
         */
        response: Response;
        params: any;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/callback.post
declare namespace Api.User.User.Wechat.Callback {
    export type Params = any;
    export interface APIContent {
        /**
         * OK
         */
        response: Response;
        params: any;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/exist/email.post
declare namespace Api.User.User.Exist.Email {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        email: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: boolean;
    }
}
// /api/user/user/exist/mobile.post
declare namespace Api.User.User.Exist.Mobile {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: boolean;
    }
}
// /api/user/user/oauth2/login.get
declare namespace Api.User.User.Oauth2.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 应用名
         */
        app: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: string;
    }
}
// /api/user/user/wechat/board/callback.get
declare namespace Api.User.User.Wechat.Board.Callback.Get {
    export interface APIContent {
        params: Params;
        response: any;
    }

    export interface Params {
        echostr: string;
        nonce: string;
        signature: string;
        timestamp: string;
    }
    export type Response = any;
}
// /api/user/user/wechat/callback.get
declare namespace Api.User.User.Wechat.Callback.Get {
    export interface APIContent {
        params: Params;
        response: any;
    }

    export interface Params {
        echostr: string;
        nonce: string;
        signature: string;
        timestamp: string;
    }
    export type Response = any;
}
// /api/user/user/account/timeliness.get
declare namespace Api.User.User.Account.Timeliness {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 是否需要账号校验
         */
        recheck?: boolean;
    }
}
// /api/user/user/logout.get
declare namespace Api.User.User.Logout {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        user_id?: number;
    }
}
// /api/user/user/modify/avatar.post
declare namespace Api.User.User.Modify.Avatar {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * form data
         */
        file: { [key: string]: any };
    }

    /**
     * OK
     */
    export interface Response {
        data?: string;
    }
}
// /api/user/user/valid.get
declare namespace Api.User.User.Valid {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        user_id?: number;
    }
}
// /api/user/3rd-party/oauth2/{source}/auth.get
declare namespace Api.User.T3rdParty.Oauth2.Source.Auth {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 应用名
         */
        app: string;
        /**
         * 登录来源: tencent_docs
         */
        source: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: string;
    }
}
// /api/user/user/account/close.delete
declare namespace Api.User.User.Account.Close {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/unbind.patch
declare namespace Api.User.User.Wechat.Unbind {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * code: 0 成功; 1200 EventKeyErr（用户未扫码）
         */
        response: Response;
    }

    /**
     * code: 0 成功; 1200 EventKeyErr（用户未扫码）
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/staff/avatar.put
declare namespace Api.User.Ent.Staff.Avatar {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * form data
         */
        file: { [key: string]: any };
        /**
         * 企业成员 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: string;
    }
}
// /api/user/user/refresh_token.put
declare namespace Api.User.User.RefreshToken {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        refresh_token?: string;
    }
}
// /api/user/account/coupon/link-receive.post
declare namespace Api.User.Account.Coupon.LinkReceive {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        order_id: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/account/coupon/receive.post
declare namespace Api.User.Account.Coupon.Receive {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        order_id: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/transfer/owner.post
declare namespace Api.User.Ent.Transfer.Owner {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 接收者 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/email/register/send-code.post
declare namespace Api.User.User.Email.Register.SendCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 邮箱
         */
        email: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/email/send-code.post
declare namespace Api.User.User.Email.SendCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        email: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/mobile/login/send-code.post
declare namespace Api.User.User.Mobile.Login.SendCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 手机号
         */
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/mobile/send-code.post
declare namespace Api.User.User.Mobile.SendCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/bind.post
declare namespace Api.User.User.Wechat.Bind {
    export interface APIContent {
        params: Params;
        /**
         * code: 0 成功; 1200 EventKeyErr（用户未扫码）
         */
        response: Response;
    }

    export interface Params {
        event_key: string;
    }

    /**
     * code: 0 成功; 1200 EventKeyErr（用户未扫码）
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/check.post
declare namespace Api.User.User.Wechat.Check {
    export interface APIContent {
        params: Params;
        /**
         * code: 0 校验通过; 1200 EventKeyErr（用户未扫码）
         */
        response: Response;
    }

    export interface Params {
        event_key: string;
    }

    /**
     * code: 0 校验通过; 1200 EventKeyErr（用户未扫码）
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/login.post
declare namespace Api.User.User.Wechat.Login {
    export interface APIContent {
        params: Params;
        /**
         * code: 0 成功; 1200 EventKeyErr（用户未扫码）
         */
        response: Response;
    }

    export interface Params {
        event_key: string;
    }

    /**
     * code: 0 成功; 1200 EventKeyErr（用户未扫码）
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/link.get
declare namespace Api.User.Ent.Link {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 链接码
         */
        link_code?: string;
        /**
         * 链接码状态
         */
        link_status?: boolean;
    }
}
// /api/user/ent/link/reset.put
declare namespace Api.User.Ent.Link.Reset {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 链接码
         */
        link_code?: string;
        /**
         * 链接码状态
         */
        link_status?: boolean;
    }
}
// /api/user/ent/trial.post
declare namespace Api.User.Ent.Trial {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 物理账号列表
         */
        account_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/account/frozen.put
declare namespace Api.User.User.Account.Frozen {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 物理账号列表
         */
        account_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/account/unfreeze.put
declare namespace Api.User.User.Account.Unfreeze {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 物理账号列表
         */
        account_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/login/code.get
declare namespace Api.User.User.Login.Code {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        code?: string;
        refresh_token?: string;
    }
}
// /api/user/inner/user/merge.post
declare namespace Api.User.Inner.User.Merge {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        from_id: number;
        to_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/email/check-code.post
declare namespace Api.User.User.Email.CheckCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/mobile/check-code.post
declare namespace Api.User.User.Mobile.CheckCode {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/administrator.delete
declare namespace Api.User.Ent.Administrator {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 需要处理的管理员 ID 列表
         */
        user_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 已处理的 ID 列表
         */
        user_ids?: number[];
    }
}
// /api/user/ent/administrator.post
declare namespace Api.User.Ent.Administrator.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 需要处理的管理员 ID 列表
         */
        user_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 已处理的 ID 列表
         */
        user_ids?: number[];
    }
}
// /api/user/ent/staff.delete
declare namespace Api.User.Ent.Staff {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 需要处理的 ID 列表
         */
        user_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 已处理的 ID 列表
         */
        user_ids?: number[];
    }
}
// /api/user/ent/link/status.put
declare namespace Api.User.Ent.Link.Status {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 链接状态: -1 关闭; 1 打开
         */
        link_status: boolean;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 链接码
         */
        link_code?: string;
        /**
         * 链接码状态
         */
        link_status?: boolean;
    }
}
// /api/user/inner/3rd-party/tencent_docs/files.delete
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 文档唯一标识
         */
        file_id: string;
        /**
         * 产品: pixso / board
         */
        product: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/new/account.post
declare namespace Api.User.User.New.Account {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        email: string;
        mobile?: string;
        password: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/account/close/check.get
declare namespace Api.User.User.Account.Close.Check {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * Info 校验信息
         * { Source: { Resource: Value }}
         * 数据来源 Source, 按产品或应用划分:
         * Pixso: -
         * BoardMix: -
         * Enterprise: 企业服务
         * 资源信息 Resource, 目前有以下类型:
         * personal_file: 个人空间下的文件数
         * personal_team: 个人空间下的团队数
         * enterprise_joined: 已加入的企业数
         * eg:
         * {
         * "Pixso": {
         * "personal_file": 1,
         * "personal_team": 2
         * },
         * "BoardMix": {
         * "personal_file": 3,
         * "personal_team": 4
         * },
         * "Enterprise": {
         * "enterprise_joined": 1
         * }
         * }
         */
        info?: { [key: string]: { [key: string]: any } };
        /**
         * 数据生成时间, 超过 5 分钟应重新校验
         */
        time?: string;
    }
}
// /api/user/ent/application.post
declare namespace Api.User.Ent.Application {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * -1 拒绝; 1 通过
         */
        action: number;
        /**
         * 需要处理的申请记录 ID 列表
         */
        ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 已处理的 ID 列表
         */
        ids?: number[];
    }
}
// /api/user/account/coupon/list.get
declare namespace Api.User.Account.Coupon.List {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        createdAt?: string;
        order_id?: string;
        type?: number;
        user_id?: number;
    }
}
// /api/user/user/wechat/bind/code.post
declare namespace Api.User.User.Wechat.Bind.Code {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 登录的产品
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        event_key?: string;
        expire_seconds?: number;
        ticket?: string;
        url?: string;
    }
}
// /api/user/user/wechat/check/code.post
declare namespace Api.User.User.Wechat.Check.Code {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 登录的产品
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        event_key?: string;
        expire_seconds?: number;
        ticket?: string;
        url?: string;
    }
}
// /api/user/ent/apply/join.post
declare namespace Api.User.Ent.Apply.Join {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 企业 ID
         */
        e_id: number;
        /**
         * 成员邮箱
         */
        email?: string;
        /**
         * 成员手机号
         */
        mobile?: string;
        /**
         * 成员姓名
         */
        staff_name: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/inner/3rd-party/tencent_docs/files.put
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files.Put {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 文档唯一标识
         */
        file_id: string;
        /**
         * 产品: pixso / board
         */
        product: string;
        /**
         * 文档的标题
         */
        title: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/reset/password.post
declare namespace Api.User.User.Reset.Password {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        email?: string;
        mobile?: string;
        password: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wechat/login/code.post
declare namespace Api.User.User.Wechat.Login.Code {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 来源 h5 小程序
         */
        from: number;
        /**
         * 登录的产品
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        event_key?: string;
        expire_seconds?: number;
        ticket?: string;
        url?: string;
    }
}
// /api/user/user/wecom/applet/callback.get
declare namespace Api.User.User.Wecom.Applet.Callback {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        echostr?: string;
        msgSignature?: string;
        nonce?: string;
        thirdPlatform?: string;
        timestamp?: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wecom/callback.get
declare namespace Api.User.User.Wecom.Callback {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        echostr?: string;
        msgSignature?: string;
        nonce?: string;
        thirdPlatform?: string;
        timestamp?: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/info.get
declare namespace Api.User.Ent.Info {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/inner/3rd-party/tencent_docs/files/thumbnail.put
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files.Thumbnail {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 缩略图文件后缀名
         */
        ext: string;
        /**
         * form data
         */
        file: { [key: string]: any };
        /**
         * 文档唯一标识
         */
        file_id: string;
        /**
         * 产品
         */
        product: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/im/share.post
declare namespace Api.User.User.Im.Share {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 内容
         */
        content: string;
        /**
         * 链接
         */
        join_url: string;
        /**
         * 主题
         */
        subject: string;
        /**
         * 被邀请的用户列表
         */
        to: number[];
        /**
         * 文件类型, pixso / boardmix
         */
        type: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wecom/applet/callback.post
declare namespace Api.User.User.Wecom.Applet.Callback.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        data: number[];
        msgSignature: string;
        nonce: string;
        thirdPlatform: string;
        timestamp: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/user/wecom/callback.post
declare namespace Api.User.User.Wecom.Callback.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        data: number[];
        msgSignature: string;
        nonce: string;
        thirdPlatform: string;
        timestamp: string;
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/ent/apply/trial.post
declare namespace Api.User.Ent.Apply.Trial {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 企业名
         */
        e_name: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业所有者对应账号的手机号
         */
        mobile: string;
        /**
         * 申请者姓名
         */
        owner_name: string;
        /**
         * 申请者职位
         */
        owner_title: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
    }

    /**
     * OK
     */
    export interface Response {
        /**
         * 返回码
         */
        code?: number;
        /**
         * 有效数据
         */
        data?: any;
        /**
         * 提示信息
         */
        msg?: string;
    }
}
// /api/user/inner/3rd-party/tencent_docs/files/access.get
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files.Access {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 文档唯一标识
         */
        file_id: string;
        /**
         * 产品: pixso / board
         */
        product: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        cloneEnable?: boolean;
        downloadEnable?: boolean;
        editEnable?: boolean;
        isOwner?: boolean;
        readEnable?: boolean;
        watermarkEnable?: boolean;
    }
}
// /api/user/ent/application.get
declare namespace Api.User.Ent.Application.Get {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        /**
         * 账号 ID
         */
        account_id?: number;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 账号所绑定的邮箱
         */
        email?: string;
        /**
         * 申请记录 ID
         */
        id?: number;
        /**
         * 账号所绑定的手机号
         */
        mobile?: string;
        /**
         * 员工姓名
         */
        staff_name?: string;
        /**
         * 状态: -1 拒绝; 0 待审核; 1 通过
         */
        status?: number;
        /**
         * 更新时间
         */
        updated_at?: string;
        /**
         * 认证信息
         */
        verify_info?: string;
    }
}
// /api/user/ent/detail.get
declare namespace Api.User.Ent.Detail {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业所有者
         */
        owner?: number;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/link/check.post
declare namespace Api.User.Ent.Link.Check {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 链接码
         */
        link_code: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 企业信息
         */
        ent_info?: EntInfo;
        /**
         * 是否已加入
         */
        has_joined?: boolean;
    }

    /**
     * 企业信息
     */
    export interface EntInfo {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/name.put
declare namespace Api.User.Ent.Name {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 企业名
         */
        e_name: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业所有者
         */
        owner?: number;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/logo.put
declare namespace Api.User.Ent.Logo {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * form data
         */
        file: { [key: string]: any };
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业所有者
         */
        owner?: number;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/tag/{app}/trial.post
declare namespace Api.User.Ent.Tag.App.Trial {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 产品: Pixso / BoardMix
         */
        app: string;
        /**
         * 状态: -1 / 1
         */
        status: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业所有者
         */
        owner?: number;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/trial.get
declare namespace Api.User.Ent.Trial.Get {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        created_at?: string;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 申请记录 ID
         */
        id?: number;
        /**
         * 企业所有者对应账号的手机号
         */
        mobile?: string;
        /**
         * 申请者姓名
         */
        owner_name?: string;
        /**
         * 申请者职位
         */
        owner_title?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 审批状态: -1 已拒绝; 0 待审批; 1 已通过
         */
        status?: number;
        updated_at?: string;
    }
}
// /api/user/user/search.get
declare namespace Api.User.User.Search {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 姓名, 模糊匹配
         */
        name: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        users?: User[];
    }

    export interface User {
        account_id?: number;
        avatar_url?: string;
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        mobile?: string;
        nick_name?: string;
        title?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
    }
}
// /api/user/inner/3rd-party/tencent_docs/files/metadata.get
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files.Metadata {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 文档唯一标识
         */
        file_id: string;
        /**
         * 产品: pixso / board
         */
        product: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        createTime?: number;
        creatorName?: string;
        ID?: string;
        isCreator?: boolean;
        isOwner?: boolean;
        lastModifyName?: string;
        lastModifyTime?: number;
        ownerName?: string;
        status?: string;
        title?: string;
        type?: string;
        url?: string;
    }
}
// /api/user/track/baidu.post
declare namespace Api.User.Track.Baidu {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 应用名: pixso / board
         */
        app: string;
        /**
         * 追踪信息
         */
        conversionTypes: ConversionType[];
        /**
         * 投放来源: cpc/ocpc
         */
        medium?: string;
    }

    export interface ConversionType {
        attributeSource?: number;
        confidence?: number;
        convertTime?: number;
        convertValue?: number;
        deviceId?: string;
        deviceType?: number;
        ext_Info?: string;
        interactionsType?: number;
        isConvert?: number;
        logidUrl: string;
        newType: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: { [key: string]: any };
    }
}
// /api/user/inner/3rd-party/tencent_docs/files.post
declare namespace Api.User.Inner.T3rdParty.TencentDocs.Files.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 文档所在文件夹唯一标识
         */
        folder_id: string;
        /**
         * 产品: pixso / board
         */
        product: string;
        /**
         * 文档的标题
         */
        title: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        createTime?: number;
        creatorName?: string;
        ID?: string;
        isCreator?: boolean;
        isOwner?: boolean;
        lastModifyName?: string;
        lastModifyTime?: number;
        ownerName?: string;
        status?: string;
        title?: string;
        type?: string;
        url?: string;
    }
}
// /api/user/ent/new.post
declare namespace Api.User.Ent.New {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业名
         */
        e_name: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业所有者姓名
         */
        owner_name?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 营业执照
         */
        business_license?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业识别号
         */
        identification_id?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业所有者
         */
        owner?: number;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/ent/related.get
declare namespace Api.User.Ent.Related {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 是否仅获取有管理权限的企业信息
         */
        admin_only?: boolean;
        /**
         * 是否包含审核中的信息
         */
        with_pending?: boolean;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 已加入
         */
        joined?: Joined[];
        /**
         * 审核中
         */
        pending?: Pending[];
    }

    export interface Joined {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }

    export interface Pending {
        /**
         * 企业 ID
         */
        e_id?: number;
        /**
         * 企业名
         */
        e_name?: string;
        /**
         * 企业名_英文
         */
        e_name_en?: string;
        /**
         * 企业 LOGO
         */
        logo_url?: string;
        /**
         * 企业其他信息
         */
        profile?: { [key: string]: any };
        /**
         * 认证状态
         */
        verified?: boolean;
    }
}
// /api/user/user/remove/email.patch
declare namespace Api.User.User.Remove.Email {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/remove/mobile.patch
declare namespace Api.User.User.Remove.Mobile {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/userinfo.get
declare namespace Api.User.User.Userinfo {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/ent/administrator.get
declare namespace Api.User.Ent.Administrator.Get {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/ent/staff.get
declare namespace Api.User.Ent.Staff.Get {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/inner/user/one.get
declare namespace Api.User.Inner.User.One {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/modify/name.post
declare namespace Api.User.User.Modify.Name {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        name: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/modify/password.post
declare namespace Api.User.User.Modify.Password {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        password: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/ent/staff/name.put
declare namespace Api.User.Ent.Staff.Name {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 用户名
         */
        staff_name: string;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/ent/staff/status.put
declare namespace Api.User.Ent.Staff.Status {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status: number;
        /**
         * 用户 ID
         */
        user_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/inner/user/email.get
declare namespace Api.User.Inner.User.Email {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        e_id?: number;
        email: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/add/identification.post
declare namespace Api.User.User.Add.Identification {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        identification: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/modify/email.post
declare namespace Api.User.User.Modify.Email {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        email: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/modify/identification.post
declare namespace Api.User.User.Modify.Identification {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        identification: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/modify/mobile.post
declare namespace Api.User.User.Modify.Mobile {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/inner/user/list.post
declare namespace Api.User.Inner.User.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        user_ids: number[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/add/email.post
declare namespace Api.User.User.Add.Email {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        email: string;
        password?: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/add/mobile.post
declare namespace Api.User.User.Add.Mobile {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        accessToken?: string;
        code: string;
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/inner/user/email/list.post
declare namespace Api.User.Inner.User.Email.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        e_id?: number;
        emails: string[];
    }

    /**
     * OK
     */
    export interface Response {
        data?: Datum[];
    }

    export interface Datum {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/cdc/login.post
declare namespace Api.User.User.Cdc.Login {
    export interface APIContent {
        params: { [key: string]: any };
        /**
         * OK
         */
        response: Response;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/reset_token.post
declare namespace Api.User.User.ResetToken {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 需要切换的企业ID, 无则不变
         */
        e_id: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        refresh_token?: string;
        user_info?: UserInfo;
    }

    export interface UserInfo {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/login/add/mobile.post
declare namespace Api.User.Login.Add.Mobile {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        mobile: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/pri-ap/login.post
declare namespace Api.User.User.PriAp.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        account: string;
        password: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/wechat/mini/login.post
declare namespace Api.User.User.Wechat.Mini.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * wx.login() 获取的临时登录凭证
         */
        code: string;
        /**
         * 产品， 1：pixso 2: board
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/wechat/mini/register.post
declare namespace Api.User.User.Wechat.Mini.Register {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * wx.login() 获取的临时登录凭证
         */
        code: string;
        /**
         * 产品， 1：pixso 2: board
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/inner/user/modify/list.post
declare namespace Api.User.Inner.User.Modify.List {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        end_at: number;
        last_id: number;
        start_at: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        last_id?: number;
        user_list?: UserList[];
    }

    export interface UserList {
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        mobile?: string;
        nick_name?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/3rd-party/bind.post
declare namespace Api.User.T3rdParty.Bind {
    export interface APIContent {
        params: Params;
        /**
         * 成功
         */
        response: Response;
    }

    export interface Params {
        /**
         * 应用名: pixso / board
         */
        app: string;
        /**
         * 来源的 用户id, 登录接口 428 返回值中的 data
         */
        id: string;
        /**
         * 登录来源: tencent_docs
         */
        source: string;
    }

    /**
     * 成功
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/oauth2/login.post
declare namespace Api.User.User.Oauth2.Login.Post {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * 简化版 OAuth2 登录, 目前用于 国防科大项目
         */
        access_token?: string;
        /**
         * 应用名
         */
        app: string;
        /**
         * 授权码 code
         */
        code?: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/restful/login.post
declare namespace Api.User.User.Restful.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        email?: string;
        mobile?: string;
        password: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/wechat/mobile/login.post
declare namespace Api.User.User.Wechat.Mobile.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        /**
         * wx.login() 获取的临时登录凭证
         */
        code: string;
        from: number;
        /**
         * 产品， 1：pixso 2: board
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/wecom/applet/login.post
declare namespace Api.User.User.Wecom.Applet.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        product: string;
        thirdPlatform: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/wecom/login.post
declare namespace Api.User.User.Wecom.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        product: string;
        thirdPlatform: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/3rd-party/oauth2/{source}/auth.post
declare namespace Api.User.T3rdParty.Oauth2.Source.Auth.Post {
    export interface APIContent {
        params: Params;
        /**
         * 成功
         */
        response: Response;
    }

    export interface Params {
        /**
         * 应用名: pixso / board
         */
        app: string;
        /**
         * 授权码 code
         */
        code: string;
        /**
         * 扩展参数: tencent_docs 需要传 redirect_uri(create_path / open_path)
         */
        extend?: { [key: string]: any };
        /**
         * 登录来源: tencent_docs
         */
        source: string;
    }

    /**
     * 成功
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/email/register.post
declare namespace Api.User.User.Email.Register {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        email: string;
        /**
         * 来源 h5 小程序
         */
        from: number;
        password: string;
        /**
         * 登录的产品
         */
        product: number;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}
// /api/user/user/mobile/login.post
declare namespace Api.User.User.Mobile.Login {
    export interface APIContent {
        params: Params;
        /**
         * OK
         */
        response: Response;
    }

    export interface Params {
        code: string;
        from: number;
        mobile: string;
        /**
         * 登录的产品
         */
        product: number;
        wechat?: string;
    }

    /**
     * OK
     */
    export interface Response {
        data?: Data;
    }

    export interface Data {
        access_token?: string;
        /**
         * 物理账号 ID
         */
        account_id?: number;
        avatar_url?: string;
        code?: string;
        /**
         * 加入时间
         */
        created_at?: string;
        /**
         * 部门
         */
        department?: string;
        /**
         * 企业 ID
         */
        e_id?: number;
        email?: string;
        has_pwd?: boolean;
        identification?: string;
        is_administrator?: boolean;
        is_owner?: boolean;
        is_register?: boolean;
        mobile?: string;
        nick_name?: string;
        refresh_token?: string;
        /**
         * 员工企业邮箱
         */
        staff_email?: string;
        /**
         * 员工状态: 0 预留; 1 在职; -1 离职
         */
        staff_status?: number;
        /**
         * 账号状态: 0 预留; 1 正常; -1 已注销; -2 已冻结
         */
        status?: number;
        tencent_docs?: string;
        tencent_docs_bm?: string;
        /**
         * 职位
         */
        title?: string;
        unique_id?: string;
        /**
         * 用户 ID
         */
        user_id?: number;
        wechat?: string;
        wecom?: string;
    }
}

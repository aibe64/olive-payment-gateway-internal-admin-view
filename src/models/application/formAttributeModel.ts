export namespace FormAttributeModel{
    export class ActiveApprovalButton{
        pending?: boolean
        rejected?: boolean
        approved?:boolean
        allItem?: boolean
        constructor(){
            this.pending = false;
            this.rejected = false;
            this.approved = false;
            this.allItem = false;
        }
    }
    export enum ActiveApprovalButtonNames{
        Approved = 2,
        Pending = 1,
        Rejected = 3,
        All = 4
    }

    export interface OriginFileObj {
        lastModified: number;
        lastModifiedDate: string;
        name: string;
        size: number;
        type: string;
        uid: string;
        webkitRelativePath: string;
    }

    export class FileInfo {
        uid?: string;
        error?: string;
        lastModified?: number;
        lastModifiedDate?: string;
        name?: string;
        originFileObj?: OriginFileObj;
        percent?: number;
        response?: string;
        size?: number;
        status?: string;
        type?: string;
    }
    export interface StrokeColor {
        '0%': string;
        '100%': string;
    }

    export interface Progress {
        strokeColor: StrokeColor;
        strokeWidth: number;
        format?: any;
    }

    export class UploadProps {
        name?: string;
        maxCount?: number;
        accept?: string;
        progress?: Progress;
        onChange?: any;
        file?:FileInfo;
        fileList?:any
    }

    export class TransactionDetails{
        amount?: string;
        agentCode?: string
        name?: string
    }
    export class KeyValuePair{
        key?: string;
        value?: any
    }
}
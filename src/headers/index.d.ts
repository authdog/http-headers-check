export interface HeaderSecurityCheck {
    name: string;
    required: boolean;
    reject?: boolean;
    possible: string[];
}
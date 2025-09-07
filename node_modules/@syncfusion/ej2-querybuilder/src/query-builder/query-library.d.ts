import { QueryBuilder } from './query-builder';
export declare class QueryLibrary {
    private parent;
    constructor(parent?: QueryBuilder);
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private queryLibrary;
    private getMongoFromRules;
    private getOperatorFromMongoOperator;
    private convertMongoQuery;
    private mongoParser;
    private mongoRecursion;
    private convertParamSqlToSql;
    private convertNamedParamSqlToSql;
    private getParameterSql;
    private getNamedParameterSql;
    private getParameterSQLVal;
    private getNamedParameterSQLVal;
    private updateRuleValue;
    private updateValue;
    private getNamedParameter;
    getModuleName(): string;
}

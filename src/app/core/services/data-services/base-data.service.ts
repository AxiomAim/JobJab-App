import {Observable} from 'rxjs';
import { BaseDto } from '../../models/base-dto.model';

export abstract class BaseDataService<T extends BaseDto> {
    public baseCollection: string;
    public abstract getAll(): Observable<Array<T>>;
    public abstract getItem(id: string): Observable<T>;
    public abstract updateItem(data: Partial<T>): Observable<T>;
    public abstract deleteItem(id: string): Observable<T>;
    public abstract createItem(data: T): Observable<T>;

    constructor(collection: string) {
        if (!collection) {
            throw new Error('Data service did not initialize its base collection path');
        }
        
        this.baseCollection = collection;
    }
}
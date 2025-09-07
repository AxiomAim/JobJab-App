import { Injectable } from '@angular/core';
import { AxiomaimDrawerComponent } from '@axiomaim/components/drawer/drawer.component';

@Injectable({ providedIn: 'root' })
export class AxiomaimDrawerService {
    private _componentRegistry: Map<string, AxiomaimDrawerComponent> = new Map<
        string,
        AxiomaimDrawerComponent
    >();

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: AxiomaimDrawerComponent): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): AxiomaimDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}

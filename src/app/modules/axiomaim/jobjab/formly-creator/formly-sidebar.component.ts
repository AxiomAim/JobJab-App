import { Component, Output, EventEmitter, inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AxiomaimVerticalNavigationComponent } from '@axiomaim/components/navigation';
import { AxiomaimNavigationItem } from '@axiomaim/components/navigation/navigation.types';

// Define interface for emitted data (renamed for clarity)
interface FieldTypeData {
    key: string;
    type: string;
}

@Component({
    selector: 'formly-sidebar',
    template: `
        <div class="py-10">
            <!-- Add any extra content that might be supplied with the component -->
            <div class="extra-content">
                <ng-content></ng-content>
            </div>

            <!-- Fixed demo sidebar -->
            <div class="mx-6 text-3xl font-bold tracking-tighter">
                Demo Sidebar
            </div>
            <axiomaim-vertical-navigation
                [appearance]="'default'"
                [navigation]="menuData"
                [inner]="true"
                [mode]="'side'"
                [name]="'demo-sidebar-navigation'"
                [opened]="true"
            ></axiomaim-vertical-navigation>
        </div>
    `,
    styles: [
        `
            axiomaim-vertical-navigation
                .axiomaim-vertical-navigation-wrapper {
                box-shadow: none !important;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [
        AxiomaimVerticalNavigationComponent,
        MatIconModule,
    ],
})
export class FormlySidebarComponent {
    @Output() fieldTypeSelected = new EventEmitter<FieldTypeData>();

    menuData: AxiomaimNavigationItem[];

    /**
     * Constructor
     */
    constructor() {
        this.menuData = [
            {
                title: 'Form Actions',
                subtitle: 'Task, project & team',
                type: 'group',
                children: [
                    {
                        title: 'Input',
                        type: 'basic',
                        icon: 'heroicons_outline:plus-circle',
                        function: () => {
                            console.log('Input clicked');
                            this.fieldTypeSelected.emit({ key: 'Input', type: 'input' });
                        }
                    },
                    {
                        title: 'Testarea',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                        function: () => {
                            console.log('Testarea clicked');
                            this.fieldTypeSelected.emit({ key: 'Textarea', type: 'textarea' });
                        }
                    },
                    {
                        title: 'Checkbox',
                        type: 'basic',
                        icon: 'heroicons_outline:briefcase',
                        function: () => {
                            console.log('Checkbox clicked');
                            this.fieldTypeSelected.emit({ key: 'Checkbox', type: 'checkbox' });
                        }
                    },
                    {
                        title: 'Radio Button',
                        type: 'basic',
                        icon: 'heroicons_outline:user-plus',
                        function: () => {
                            console.log('Radio Button clicked');
                            this.fieldTypeSelected.emit({ key: 'Radio Button', type: 'radio' });
                        }
                    },
                    {
                        title: 'Select',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Select clicked');
                            this.fieldTypeSelected.emit({ key: 'Select', type: 'select' });
                        }
                    },
                    {
                        title: 'Select Multiple',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Select Multiple clicked');
                            this.fieldTypeSelected.emit({ key: 'Select Multiple', type: 'select' });
                        }
                    },
                    {
                        title: 'Datepicker',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Datepicker clicked');
                            this.fieldTypeSelected.emit({ key: 'Datepicker', type: 'datepicker' });
                        }
                    },
                    {
                        title: 'Toggle',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Toggle clicked');
                            this.fieldTypeSelected.emit({ key: 'Toggle', type: 'toggle' });
                        }
                    },
                    {
                        title: 'Slider',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Slider clicked');
                            this.fieldTypeSelected.emit({ key: 'Slider', type: 'slider' });
                        }
                    },
                    {
                        title: 'Autocomplete',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:check-badge',
                        function: () => {
                            console.log('Autocomplete clicked');
                            this.fieldTypeSelected.emit({ key: 'Autocomplete', type: 'autocomplete' });
                        }
                    },
                ],
            },
            {
                type: 'divider',
            },
        ];
    }
}
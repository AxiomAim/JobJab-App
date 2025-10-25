import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core'; //  Import ElementRef and ViewChild
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoogleMapsService } from '../../../../main'; // Import the service
import { Subscription } from 'rxjs';

declare var google: any;

@Component({
  selector: 'address-lookup',
  templateUrl: './address-lookup.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    TextFieldModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgFor,
    NgClass
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressLookupComponent),
      multi: true
    }
  ]
})
export class AddressLookupComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: string = 'address-lookup';
  @Input() label!: string;
  @Input() formFieldAppearence!: string;
  @Input() placeholder!: string;
  @Input() readOnly: boolean = false;
  @Input() selectedOptionData: any;
  @Input() type: string = 'search';
  @Input() optionData: any[] = [];
  @Input() errControlname: any;
  @Input() selectedValue: any;
  @Input() selectedKey: any;
  @Input() errorText!: string;
  @Input() autocompleteAttribute: string = 'off';
  @Input() disabled: boolean = false;

  @ViewChild('addressInput', { static: true }) addressInput!: ElementRef; //  Get a reference to the input

  formFieldHelpers: string[] = [''];
  internalControl: FormControl = new FormControl('', [
      Validators.required,
  ]);

  /**
   * Get the form field helpers as string
   */
      getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

      
  private autocomplete: any; // google.maps.places.Autocomplete;
  private mapsLoadedSubscription?: Subscription;
  mapsLoadingError: string | null = null; //  For error message

  // CVA properties
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(
    private zone: NgZone,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    // Subscribe to internal control changes to notify parent form
    this.internalControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });

    this.mapsLoadedSubscription = this.googleMapsService
      .loadGoogleMaps()
      .subscribe({
        next: () => {
          // Maps are loaded, initialize Autocomplete
          this.initializeAutocomplete();
        },
        error: (error) => {
          console.error('Error loading google maps', error);
          this.mapsLoadingError = 'Failed to load Google Maps. Please check your connection or API key.';
          // Handle the error appropriately
        },
      });
  }

  ngOnDestroy(): void {
    this.mapsLoadedSubscription?.unsubscribe();
  }

  // CVA: Write value from parent form to internal control
  writeValue(value: any): void {
    this.internalControl.setValue(value, { emitEvent: false });
  }

  // CVA: Register change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // CVA: Register touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // CVA: Handle disabled state
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.internalControl.disable();
    } else {
      this.internalControl.enable();
    }
  }

  // Mark as touched on blur
  onTouchedCallback(): void {
    this.internalControl.markAsTouched();
    this.onTouched();
  }

  private initializeAutocomplete(): void {
    if (!this.addressInput) {
      return; //  Input element not available yet
    }
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      {
        types: ['address'], //  Restrict to addresses (optional)
        componentRestrictions: { country: 'US' }, //  Restrict to a country (optional)
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.selectedOption.emit({ value: place, type: this.type });
          // Update internal control, which triggers onChange
          this.internalControl.setValue(place.formatted_address);
        } else {
          this.internalControl.setValue(''); //  Clear the internal control
        }
      });
    });
  }

  optionSelected(value: any) {
    this.selectedOption.emit({ value: value, type: this.type });
    // If manual option select, update internal value
    this.internalControl.setValue(value);
  }

  onInput($event: any) {
    //  No longer using AutocompleteService directly
    // Value updates are handled via internalControl
  }
}
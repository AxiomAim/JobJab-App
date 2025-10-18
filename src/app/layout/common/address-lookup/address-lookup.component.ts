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
})
export class AddressLookupComponent implements OnInit, OnDestroy {
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: string = 'address-lookup';
  @Input() label!: string;
  @Input() formFieldAppearence!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() readOnly: boolean = false;
  @Input() selectedOptionData: any;
  @Input() type: string = 'search';
  @Input() formGroup!: FormGroup;
  @Input() optionData: any[] = [];
  @Input() errControlname: any;
  @Input() selectedValue: any;
  @Input() selectedKey: any;
  @Input() errorText!: string;
  @Input() autocompleteAttribute: string = 'off';
  @Input() disabled: boolean = false;


  @ViewChild('addressInput', { static: true }) addressInput!: ElementRef; //  Get a reference to the input

  formFieldHelpers: string[] = [''];
  fixedSubscriptInput: FormControl = new FormControl('', [
      Validators.required,
  ]);
  dynamicSubscriptInput: FormControl = new FormControl('', [
      Validators.required,
  ]);
  fixedSubscriptInputWithHint: FormControl = new FormControl('', [
      Validators.required,
  ]);
  dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
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


  constructor(
    private zone: NgZone,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
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
          this.control.setValue(place.formatted_address); //  Update the FormControl with selected address
        } else {
          this.control.setValue(''); //  Clear the FormControl
        }
      });
    });
  }

  optionSelected(value: any) {
    this.selectedOption.emit({ value: value, type: this.type });
  }

  onInput($event: any) {
    //  No longer using AutocompleteService directly
  }
}
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnDestroy,
  ViewChild,
  ElementRef,
  forwardRef,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoogleMapsService } from '../../../../main';
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
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressLookupComponent),
      multi: true,
    },
  ],
})
export class AddressLookupComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, AfterViewInit {
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: string = 'address-lookup';
  @Input() label: string = 'Address';
  @Input() formFieldAppearence!: string;
  @Input() placeholder!: string;
  @Input() readOnly: boolean = false;
  @Input() type: string = 'search';
  @Input() errorText!: string;
  @Input() autocompleteAttribute: string = 'off';
  @Input() disabled: boolean = false;
  @ViewChild('addressInput', { static: true }) addressInput!: ElementRef;
  @ViewChildren('formInputs') formInputs: QueryList<ElementRef<HTMLInputElement>>;
  value: string = '';

  private autocomplete: any;
  private mapsLoadedSubscription?: Subscription;
  mapsLoadingError: string | null = null;

  // ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
    private zone: NgZone,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setDisabledState(this.disabled);
    }
  }

  ngOnInit(): void {
    this.setDisabledState(this.disabled);

    this.mapsLoadedSubscription = this.googleMapsService
      .loadGoogleMaps()
      .subscribe({
        next: () => {
          this.initializeAutocomplete();
        },
        error: (error) => {
          console.error('Error loading google maps', error);
          this.mapsLoadingError = 'Failed to load Google Maps. Please check your connection or API key.';
        },
      });
  }

  ngAfterViewInit(): void {
  // ... existing code ...
  // Set readonly on all inputs after view init
  this.formInputs?.forEach(input => {
    input.nativeElement.readOnly = true;
  });
}

onInputFocus(event: FocusEvent): void {
  (event.target as HTMLInputElement).readOnly = false;
}
  ngOnDestroy(): void {
    this.mapsLoadedSubscription?.unsubscribe();
  }

  onModelChange(value: string): void {
    this.onChange(value);
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private initializeAutocomplete(): void {
    if (!this.addressInput) {
      return;
    }
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'US' },
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.selectedOption.emit({ value: place, type: this.type });
          // Autocomplete already sets the input value, ngModel updates this.value and calls onChange
        } else {
          this.value = '';
          this.onChange('');
        }
      });
    });
  }
}
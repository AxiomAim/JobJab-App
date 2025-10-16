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
} from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule
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
    ReactiveFormsModule
  ],
})
export class AddressLookupComponent implements OnInit, OnChanges, OnDestroy {
  @Output() selectedOption: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: string = 'address-lookup';
  @Input() label!: string;
  @Input() formFieldAppearence!: string;
  @Input() placeholder!: string;
  @Input() formControl!: FormControl;
  @Input() readOnly: boolean = false;
  @Input() type: string = 'search';
  @Input() errorText!: string;
  @Input() autocompleteAttribute: string = 'off';
  @Input() disabled: boolean = false;

  @ViewChild('addressInput', { static: true }) addressInput!: ElementRef;

  private autocomplete: any;
  private mapsLoadedSubscription?: Subscription;
  mapsLoadingError: string | null = null;

  constructor(
    private zone: NgZone,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && this.formControl) {
      if (this.disabled) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    }
  }

  ngOnInit(): void {
    if (this.disabled) {
      this.formControl.disable();
    }

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

  ngOnDestroy(): void {
    this.mapsLoadedSubscription?.unsubscribe();
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
          this.formControl.setValue(place.formatted_address);
        } else {
          this.formControl.setValue('');
        }
      });
    });
  }
}
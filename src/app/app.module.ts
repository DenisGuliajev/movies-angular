import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MovieService } from './services/movie/movie.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AuthService } from './services/auth/auth.service';
import { httpInterceptorProviders } from './http-interceptors';
import { AdvancedSearchComponent } from './components/elements/advanced-search/advanced-search.component';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteInputComponent } from './components/elements/autocomplete-input/autocomplete-input.component';
import {CustomDirectivesModule} from './directives/custom-directives.module';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MovieDetailResolverService } from './services/movie/movie-detail-resolver.service';
import { MoviesListModule } from './components/pages/movies-list/movies-list.module';
import { MovieDetailsModule } from './components/pages/movie-details/movie-details.module';

@NgModule({
  declarations: [
    EnumToArrayPipe,
    AppComponent,
    AdvancedSearchComponent,
    AutocompleteInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatButtonToggleModule,
    MoviesListModule,
    MovieDetailsModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    MatAutocompleteModule,
    CustomDirectivesModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    httpInterceptorProviders,
    MovieService,
    MovieDetailResolverService
  ],
  exports: [
    // MovieGridTileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

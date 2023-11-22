import { Store } from '@ngrx/store';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  authState!: Observable<fromAuth.AuthState>;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe((response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }
}

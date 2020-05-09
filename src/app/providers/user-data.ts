import {
  Injectable
} from '@angular/core';
import {
  Storage
} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) {}

  login(id: string, token: string): Promise < any > {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setId(id).then(() => {
        this.setJwtToken(token);
        return window.dispatchEvent(new CustomEvent('user:login'));
      });
    });
  }

  signup(id: string, token: string): Promise < any > {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setId(id).then(() => {
        this.setJwtToken(token);
        return window.dispatchEvent(new CustomEvent('user:signup'));
      });
    });
  }

  logout(): Promise < any > {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('id').then(() => {
        return this.storage.remove('jwttoken');
      });
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setId(id: string): Promise < any > {
    return this.storage.set('id', id);
  }

  getId(): Promise < string > {
    return this.storage.get('id').then((value) => {
      return value;
    });
  }

  setJwtToken(token: string): Promise < any > {
    return this.storage.set('jwttoken', token);
  }

  getJwtToken(): Promise < string > {
    return this.storage.get('jwttoken').then((value) => {
      return value;
    });
  }

  setMarkedPlayer(userId: string): Promise < any > {
    return this.storage.set('marked', userId);
  }

  getMarkedPlayer(): Promise < string > {
    return this.storage.get('marked').then((value) => {
      return value;
    });
  }

  removeMarkedPlayer(): Promise < any > {
    return this.storage.remove('marked');
  }

  isLoggedIn(): Promise < boolean > {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise < string > {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}

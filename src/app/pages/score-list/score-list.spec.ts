import {
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  TestBed,
  async
} from '@angular/core/testing';
import {
  ActionSheetController
} from '@ionic/angular';

import {
  InAppBrowser
} from '@ionic-native/in-app-browser/ngx';
import {
  ScoreListPage
} from './score-list';


const confDataSub = {};

describe('ScoreListPage', () => {
  let fixture, app;
  beforeEach(async (() => {
    const actionSheetSpy = jasmine.createSpyObj('ActionSheetController', [
      'create'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const iabSpy = jasmine.createSpyObj('InAppBrowser', ['create']);

    TestBed.configureTestingModule({
      declarations: [ScoreListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActionSheetController,
          useValue: actionSheetSpy
        },
        {
          provide: InAppBrowser,
          useValue: iabSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreListPage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the score list page', () => {
    expect(app).toBeTruthy();
  });
});

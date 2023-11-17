import {waitForAsync, TestBed, ComponentFixture} from "@angular/core/testing"
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module'
import { Router } from "@angular/router";
import { PostDetailsComponent } from "./Post/post-details/post-details.component";
import { PostHomeComponent } from "./Post/post-home/post-home.component";
import { AppComponent } from "./app.component";
import { Location } from "@angular/common";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HomeComponent } from "./components/home/home.component";
import { UsersComponent } from "./components/users/users.component";
import { CategoriesComponent } from "./components/categories/categories.component";

describe("App routing", () => {

  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let homeFixture: ComponentFixture<HomeComponent>;
  let usersFixture: ComponentFixture<UsersComponent>;
  let categoriesFixture: ComponentFixture<CategoriesComponent>;
  let categoryComponent: CategoriesComponent;
  let location: Location;
  let debugElement: DebugElement;
  let btnElement: DebugElement;
  let cateElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent, HomeComponent, UsersComponent, CategoriesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture = TestBed.createComponent(AppComponent);
    homeFixture = TestBed.createComponent(HomeComponent);
    usersFixture = TestBed.createComponent(UsersComponent);
    categoriesFixture = TestBed.createComponent(CategoriesComponent);
    categoryComponent = categoriesFixture.componentInstance;
    debugElement = homeFixture.debugElement;
    btnElement = usersFixture.debugElement;
    cateElement = categoriesFixture.debugElement;
  })

  it("should navigate to default path = Home", waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    })
  }))

  it("should navigate to users on clicking the link in home component", waitForAsync(() => {
    homeFixture.detectChanges();
    let link = debugElement.query(By.css('a'));
    link.nativeElement.click();
    homeFixture.whenStable().then(() => {
      expect(location.path()).toBe('/users');
    })
  }))

  it("should navigate back to previous on clicking back button in categories component",waitForAsync(() => {
    homeFixture.detectChanges();
    spyOn(categoryComponent, 'goBack');

    // let homeLinks = debugElement.queryAll(By.css('a'));
    // homeLinks[1].nativeElement.click();

    let links = cateElement.queryAll(By.css('button'));
    let path = location.path() || '/';

    console.log("Before CLick : ", path);

    links[0].nativeElement.click();
    expect(categoryComponent.goBack).toHaveBeenCalled();
    console.log("After CLick : ", location.path());

    homeFixture.whenStable().then(() => {
      expect(location.path()).toEqual(path);
    })
  }))

})

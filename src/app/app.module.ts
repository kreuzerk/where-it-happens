import {NgModule} from "@angular/core";
import {AppComponent, ChildOneComponent, ChildTwoComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, RouterOutlet, ChildOneComponent, ChildTwoComponent, BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

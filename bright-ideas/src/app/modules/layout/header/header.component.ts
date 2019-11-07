import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToHome(): void {
    this.router.navigateByUrl("/home");
  }

  search(searchText, searchType): void {
    if (searchText != null)
    {
      if(searchType == null || searchType == "ideas")
      {
        this.router.navigateByUrl('/searchResults/Ideas/' + searchText.value)
      }
      else
      {
        this.router.navigateByUrl('/searchResults/Profiles/' + searchText.value)
      }
    }
  }
}

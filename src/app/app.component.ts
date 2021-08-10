import { Component } from '@angular/core'
import { Observable } from "rxjs"
import { Query, User } from "./types"
import { Apollo, gql } from "apollo-angular"
import { map } from "rxjs/operators";

const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'TITLE'
  constructor(private apollo: Apollo) {}
  users: Observable<User[]> = this.apollo
  .watchQuery<Query>({
    query: GET_USERS
  })
  .valueChanges.pipe(map(result => result.data.users));
}

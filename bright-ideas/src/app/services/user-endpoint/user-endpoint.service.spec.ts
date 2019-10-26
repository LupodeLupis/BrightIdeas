import { TestBed, async } from "@angular/core/testing";

import { UserEndpointService } from '../../services/user-endpoint/user-endpoint.service';
import { HttpClientModule } from '@angular/common/http';

describe("UserEndpointService", () => {
  let service: UserEndpointService;
  let testUser = [{
    id: 1,
    email: "user1@gmail.com",
    profile: "profile 1",
    password: "hashedPassword",
    previousPassword: "prevHashedPassword"
  },{
    id: 2,
    email: "user2@gmail.com",
    profile: "profile 2",
    password: "hashedPassword2",
    previousPassword: "prevHashedPassword2"
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserEndpointService]
    })
    service = TestBed.get(UserEndpointService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getUsers().subscribe(res => {
      expect(res).toEqual(testUser);
    });
  });

  it('should get an user by id', () => {
    service.getUserById(1).subscribe(res => {
      expect(res).toEqual(testUser[0]);
    });
  });

  it("should create an user", () => {
    service.createUser(testUser[0]).subscribe((res) => {
      expect(res).toEqual(testUser[0]);
    });
  });

  it("should update user", () => {
    service.updateUser(testUser[1]).subscribe((res) => {
      expect(res).toEqual(testUser[1]);
    });
  });
});

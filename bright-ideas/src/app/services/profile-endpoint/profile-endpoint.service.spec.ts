import { TestBed, async } from "@angular/core/testing";

import { ProfileEndpointService } from "./profile-endpoint.service";
import { HttpClientModule } from '@angular/common/http';

describe("ProfileEndpointService", () => {
  let service: ProfileEndpointService;
  let testProfile = [{
    picture: "pictureString",
    displayName: "displayName",
    projectDescription: "description of project",
    idea: 1
  },
  {
    picture: "pictureString2",
    displayName: "displayName2",
    projectDescription: "description of project",
    idea: 2
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProfileEndpointService]
    })
    .compileComponents();
    service = TestBed.get(ProfileEndpointService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  
  it('should get all profile', () => {
    service.getProfiles().subscribe(res => {
      expect(res).toEqual(testProfile);
    });
  });

  
  it('should get a profile by id', () => {
    service.getProfileById(1).subscribe(res => {
      expect(res).toEqual(testProfile[0]);
    });
  });


  it("should create a profile", () => {
    service.createProfile(testProfile[0]).subscribe((res) => {
      expect(res).toEqual(testProfile[0]);
    });
  });

  it("should update profile", () => {
    service.updateProfile(testProfile[1]).subscribe((res) => {
      expect(res).toEqual(testProfile[1]);
    });
  });
});

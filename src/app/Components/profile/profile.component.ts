import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ProfileService} from '../../Services/Halo5/profile.service';
import {MetadataService} from '../../Services/Halo5/metadata.service';
import {StatsService} from '../../Services/Halo5/stats.service';


@Component({
  selector: 'app-profile-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  providers: [ProfileService, StatsService]
})
export class ProfileComponent implements OnInit {
  errorMessage: string;
  @Input() name: string;
  public spartanProfile: {};
  public spartanEmblem: {};
  public spartanImage: {};
  public spartanCommendations: any;

  constructor (private profileService: ProfileService, private metadataService: MetadataService, private statsServcie: StatsService) {
  }

  ngOnInit(): void {
    this.getSpartanInfo();
  }

  getSpartanInfo(): void {
    this.profileService.getPlayerAppearance(this.name).subscribe(
      spartan => {
        this.spartanProfile = spartan;
      },
      error => this.errorMessage = <any>error
    );
    this.profileService.getEmblemImage(this.name, '').subscribe(
      spartan => {
        this.spartanEmblem = spartan;
        this.displayImage(this.spartanEmblem, 'spartan-emblem');
      },
      error => this.errorMessage = <any>error
    );
    this.profileService.getSpartanImage(this.name, '', '').subscribe(
      spartan => {
        this.spartanImage = spartan;
        this.displayImage(this.spartanImage, 'spartan-image');
      },
      error => this.errorMessage = <any>error
    );
    this.statsServcie.getPlayerCommendations(this.name).subscribe(
      spartan => {
        this.spartanCommendations = spartan;
      },
      error => this.errorMessage = <any>error
    );
  }

  public displayImage(imgBin: any, imageClass: string): void {
    const uri: string = URL.createObjectURL(imgBin);
    const element: any = document.getElementById('spartanImages');
    const image: any = document.createElement('img');
    image.src = uri;
    image.className += imageClass;
    element.appendChild(image);
  }
}

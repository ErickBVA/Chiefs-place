import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../Services/Halo5/profile.service';
import {MetadataService} from '../../Services/Halo5/metadata.service';


@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [ProfileService, MetadataService]
})
export class HeaderComponent implements OnInit {
  errorMessage: string;
  _gamerTag: string;
  showProfile: boolean;
  title = 'Pending title';

  constructor (private profileService: ProfileService, private metadataService: MetadataService) {
    this.showProfile = false;
  }

  ngOnInit(): void {
  }

  get gamerTag() {
    return this._gamerTag;
  }

  set gamerTag (value: string) {
    this._gamerTag = value;
  }

  public getSpartanInfo() {
    if (this.gamerTag) {
      this.showProfile = true;
    }
  }
}

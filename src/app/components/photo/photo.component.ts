import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Downloader, DownloadRequest } from '@ionic-native/downloader/ngx';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {

  @Input() place: any;

  constructor(
    public modalController: ModalController,
    // private downloader: Downloader
  ) { }

  ngOnInit() { }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  // download() {
  //   var request: DownloadRequest = {
  //     uri: this.place,
  //     title: 'MyDownload',
  //     description: '',
  //     mimeType: '',
  //     visibleInDownloadsUi: true,
  //     // notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
  //     destinationInExternalFilesDir: {
  //       dirType: 'Downloads',
  //       subPath: 'MyFile.apk'
  //     }
  //   };


  //   this.downloader.download(request)
  //     .then((location: string) => console.log('File downloaded at:' + location))
  //     .catch((error: any) => console.error(error));
  // }

}

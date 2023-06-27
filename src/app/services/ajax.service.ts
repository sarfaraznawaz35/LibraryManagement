import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtService, ResponseModel } from "./jwtService";
import { CommonService } from "./common.service";

@Injectable()
export class AjaxService {
  IsTokenByPass: boolean = true;
  baseUrl: String = "http://localhost:8080/";
  constructor(
    private tokenHelper: JwtService,
    private http: HttpClient,
    private commonService: CommonService
  ) {
    if (environment.production) {
      console.log("[Bottomhalf]: Bottomhalf/builder Running");
    } else {
      console.log("[Bottomhalf]: localhost Running");
    }
  }

  public GetImageBasePath() {
    let ImageBaseUrl = this.baseUrl.replace("/api", "/Files");
    return ImageBaseUrl;
  }

  LoadStaticJson(StaticUrl: string): Observable<any> {
    let JsonData = this.http.get(StaticUrl);
    this.commonService.HideLoader();
    return JsonData;
  }

  get(Url: string, IsLoaderRequired: boolean = true): Promise<ResponseModel> {
    return new Promise((resolve, reject) => {
      if (IsLoaderRequired) {
        this.commonService.ShowLoaderByAjax();
      } else {
        this.commonService.ShowLoaderByAjax();
      }
      return this.http
        .get(this.baseUrl + Url, {
          observe: "response"
        })
        .subscribe(
          (res: any) => {
            if (this.tokenHelper.IsValidResponse(res.body)) {
              resolve(res.body);
            } else {
              res.body = null;
              resolve(res.body);
            }
          },
          (error: HttpErrorResponse) => {
            this.commonService.HideLoaderByAjax();
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(false);
          });
    });
  }

  post(Url: string, Param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      this.http
        .post(this.baseUrl + Url, Param, {
          observe: "response"
        })
        .subscribe(
          (res: HttpResponse<any>) => {
            try {
              if (!this.tokenHelper.IsValidResponse(res.body)) {
                reject(null);
              }
            } catch (e) {
              reject(null);
            }
            resolve(res.body);
            this.commonService.HideLoaderByAjax();
          },
          error => {
            this.commonService.HideLoaderByAjax();
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(error);
          }
        );
    });
  }

  put(Url: string, Param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      this.http
        .put(this.baseUrl + Url, Param, {
          observe: "response"
        })
        .subscribe(
          (res: HttpResponse<any>) => {
            try {
              if (!this.tokenHelper.IsValidResponse(res.body)) {
                reject(null);
              }
            } catch (e) {
              reject(e);
            }
            resolve(res.body);
            this.commonService.HideLoaderByAjax();
          },
          error => {
            this.commonService.HideLoaderByAjax();
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(error);
          }
        );
    });
  }

  postRequest(Url: string, Param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      this.http
        .post(Url, Param, {
          observe: "response"
        })
        .subscribe(
          (res: HttpResponse<any>) => {
            resolve(res.body);
          },
          error => {
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(null);
          }
        );
    });
  }

  delete(Url: string, Param?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      this.http.delete(this.baseUrl + Url, {
        headers: {
          observe: "response",
        },
        body: Param
      })
        .subscribe(
          (res: any) => {
            try {
              if (!this.tokenHelper.IsValidResponse(res)) {
                reject(null);
              }
            } catch (e) {
              reject(e);
            }
            resolve(res);
            this.commonService.HideLoaderByAjax();
          },
          error => {
            this.commonService.HideLoaderByAjax();
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(error);
          }
        );
    });
  }

  login(Url: string, Param: any): Promise<ResponseModel> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      if (this.commonService.IsValid(Param)) {
        this.http
          .post(this.baseUrl + Url, Param, {
            observe: "response"
          })
          .subscribe(
            (res: HttpResponse<any>) => {
              try {
                // if (this.tokenHelper.IsValidResponse(res.body)) {
                //   let loginData: ResponseModel = res.body;
                //   if (this.tokenHelper.setLoginDetail(loginData.ResponseBody)) {
                //     resolve(res.body);
                //   } else {
                //     resolve(res.body);
                //   }
                // } else {
                //   reject(null);
                // }
                resolve(res.body);
              } catch (e) {
                reject(e);
              }
              this.commonService.HideLoaderByAjax();
            },
            error => {
              this.commonService.HideLoaderByAjax();
              this.tokenHelper.HandleResponseStatus(error.status);
              reject(error);
            }
          );
      }
    });
  }

  upload(Url: string, Param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.commonService.ShowLoaderByAjax();
      this.http
        .post(this.baseUrl + Url, Param, {
          observe: "response"
        })
        .subscribe(
          (res: HttpResponse<any>) => {
            try {
              if (!this.tokenHelper.IsValidResponse(res.body)) {
                reject(null);
              }
            } catch (e) {
              reject(e);
            }
            resolve(res.body);
            this.commonService.HideLoaderByAjax();
          },
          error => {
            this.commonService.HideLoaderByAjax();
            this.tokenHelper.HandleResponseStatus(error.status);
            reject(error);
          }
        );
    });
  }
}

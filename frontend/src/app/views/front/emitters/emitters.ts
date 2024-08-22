import { EventEmitter, OnInit } from "@angular/core";

export class Emitters{
    static authEmitter = new EventEmitter<boolean>();
    static emitterr = new EventEmitter<any>();
    static clientEmitter = new EventEmitter<number>();
}
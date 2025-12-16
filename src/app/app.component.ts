import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pelicula } from './Interfaces/pelicula';
import { PeliculaService } from './Services/pelicula.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
 //   RouterOutlet, 
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  listaPeliculas: Pelicula[]=[];
  formularioPelicula:FormGroup;

  //private _peliculaServicio: PeliculaService;
  //private fb: FormBuilder;
  //private cdr = inject(ChangeDetectorRef); 
  
  constructor(
    private _peliculaServicio: PeliculaService,
    private fb: FormBuilder
  ){
    this.formularioPelicula = this.fb.group({
      titulo:['',Validators.required],
      imagen:['',Validators.required],  
      descripcion:['',Validators.required],
      fechaEstreno:[null,Validators.required],
      estrellas:[0,Validators.required],
    });
    //this.cdr.detectChanges();
  }

  obtenerPeliculas(){
    this._peliculaServicio.getList().subscribe({
      next:(data: Pelicula[])=>{
        this.listaPeliculas = [...data];
        //this.cdr.detectChanges(); 
      },
      
      error:(e: any)=>{
        console.error("Error al cargar la lista de películas:", e);
      }
    })
  }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  agregaPelicula(){
    const formValue = this.formularioPelicula.value;

    const request: Pelicula = {
      idPelicula: 0,
      titulo: formValue.titulo,
      imagen: formValue.imagen,
      descripcion: formValue.descripcion,
      fechaEstreno: formValue.fechaEstreno,
      estrellas: formValue.estrellas, 
    }

    this._peliculaServicio.add(request).subscribe({
      next:(data: Pelicula)=>{
        
        this.formularioPelicula.reset({
            titulo: '', imagen: '', descripcion: '', fechaEstreno: null, estrellas: 0 
            }); 
        this.obtenerPeliculas(); 
      },
     
      error:(e: any)=>{
        console.error("Error al agregar película:", e);
        alert("Fallo al agregar película. Revisa la consola (F12) para ver el error de la API.");
      }
    })
  }
  eliminarPelicula(pelicula: Pelicula){
    this._peliculaServicio.delete(pelicula.idPelicula).subscribe({
      next:(data)=>{
        this.obtenerPeliculas();
      },
      
      error:(e: any)=>{
        console.error("Error al eliminar película:", e);
      }
    })
  }
}
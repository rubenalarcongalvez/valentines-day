import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

export interface PR {
  pregunta: string,
  respuesta: string,
  opciones: string[],
  eleccion: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  link = `https://api.whatsapp.com/send/?text=💓&type=phone_number&app_absent=0`;
  respuestaElegida: boolean = false;
  ratioRespuestas: number = 0;
  aceptado: boolean = false;
  preguntasYRespuestas: PR[] = [
    {
      pregunta: '¿De qué color son mis ojos?',
      respuesta: 'Verdes',
      opciones: [
        'Azules',
        'Verdes',
        'Marrones',
        'Negros'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿Cuál sería mi superpoder favorito?',
      respuesta: 'Controlar el tiempo',
      opciones: [
        'Volar',
        'Cambiaformas',
        'Controlar la mente de cualquier ser vivo',
        'Controlar el tiempo'
      ],
      eleccion: '',
    },
    {
      pregunta: '¿Dónde tengo el lunar más característico en mi cara?',
      respuesta: 'Debajo de los labios a mi izquierda',
      opciones: [
        'Debajo de los labios a mi izquierda',
        'Debajo de los labios a mi derecha',
        'Encima de los labios a mi derecha',
        'Encima de los labios a mi izquierda'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿A dónde me gustaría viajar en el futuro si tuviera dinero?',
      respuesta: 'Japón',
      opciones: [
        'Australia',
        'Japón',
        'Suiza',
        'Canadá'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿Cuál es mi deporte favorito?',
      respuesta: 'Tenis',
      opciones: [
        'Pádel',
        'Tenis',
        'Ping-pong',
        'Bádminton'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿Qué comida detesto?',
      respuesta: 'Fabada',
      opciones: [
        'Fabada',
        'Lentejas',
        'Potaje',
        'Brócoli'
      ],
      eleccion: ''
    },
    {
      pregunta: 'Serie favorita',
      respuesta: 'The Good Place',
      opciones: [
        'Merlí',
        'The Good Place',
        'Rick y Morty',
        'Silicom Valley'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿Qué me gusta más? (aunque todos están muy muy a la par)',
      respuesta: 'Tenis',
      opciones: [
        'Tenis',
        'Informática',
        'Videojuegos',
        'Viajar'
      ],
      eleccion: ''
    },
    {
      pregunta: '¿Cuál es mi tenista favorito?',
      respuesta: 'Roger Federer',
      opciones: [
        'Rafael Nadal',
        'Novak Djokovic',
        'Roger Federer',
        'Carlos Alcaraz'
      ],
      eleccion: ''
    },
  ];

  constructor(private fb: FormBuilder) {}

  todasCorrectas(): boolean {
    return this.preguntasYRespuestas.filter(pr => pr.eleccion != '' && pr.eleccion == pr.respuesta).length == this.preguntasYRespuestas.length;
  }

  quedanPreguntas(): boolean {
    return this.preguntasYRespuestas.filter(pr => pr.eleccion == '')?.length > 0;
  }

  preguntaActual(): PR {
    return this.preguntasYRespuestas.find(pr => pr.eleccion == '')!;
  }

  /* De esta forma, ponemos la pregunta, la ultima cuando hemos elegido */
  elegirRespuesta(eleccion: string, $event: any) {
    if (this.respuestaElegida) {
      return;
    }

    this.respuestaElegida = true;
    let preguntaRespuestaAnterior = this.preguntaActual();
    
    /* Hacemos la transicion */
    let elementoHTML = $event.currentTarget;
    if (eleccion == preguntaRespuestaAnterior.respuesta) {
      elementoHTML.classList.add('correcto');
      this.ratioRespuestas++;
    } else {
      elementoHTML.classList.add('incorrecto');
      this.ratioRespuestas--;
    }

    setTimeout(() => {
      elementoHTML.classList.remove('incorrecto');
      elementoHTML.classList.remove('correcto');
      
      /* Ordenamos */
      preguntaRespuestaAnterior.eleccion = eleccion;
      let indiceEliminar = this.preguntasYRespuestas.indexOf(preguntaRespuestaAnterior);
      this.preguntasYRespuestas[indiceEliminar] = preguntaRespuestaAnterior;

      this.respuestaElegida = false;
    }, 1000)
  }

  mensajeFinal(): string {
    let mensaje = 'Podemos pasar San Valentín juntos 💘';

    if (this.todasCorrectas()) {
      mensaje = 'Realmente eres mi alma gemela ¡Pasaremos todos los San Valentín juntos! 💓💓💓'
    } else {
      if(this.ratioRespuestas <= -6) {
        mensaje = 'Eres un ser detestable, no te mereces nada conmigo...';
      } else if(this.ratioRespuestas <= -4) {
        mensaje = 'Me has decepcionado... No quiero pasar San Valentín contigo...';
      } else if (this.ratioRespuestas < 0) {
        mensaje = 'Bueno, tendremos que pasar San Valentín juntos 😘, pero algo no anda bien...';
      } else if (this.ratioRespuestas >= 3) {
        mensaje = "Lo pasaremos genial en nuestro San Valentín juntos 😘💓"
      }
    }
    
    return mensaje;
  }

  top: number = 0;
  right: number = 0;
  fontSizeRechazar: number = 16;
  fontSizeAceptar: number = 16;
  desaparecer: boolean = false;
  rechazadoPrimeraVez: boolean = false;
  minWidthRechazar: string = '200px';
  rechazar() {
    this.minWidthRechazar = '0';

    /* de 0 a 100 yendo de 25 en 25 */
    let topAleatorio: number = Math.floor(Math.random() * 5) * 25;
    let rightAleatorio: number = Math.floor(Math.random() * 5) * 25;

    /* lo que no pueden ser es los dos iguales que antes */
    if (topAleatorio == this.top && rightAleatorio == this.right) {
      topAleatorio = Math.floor(Math.random() * 5) * 25;
    }
    while (topAleatorio == this.top && rightAleatorio == this.right) {
      rightAleatorio = Math.floor(Math.random() * 5) * 25;
    }

    this.top = topAleatorio;
    this.right = rightAleatorio;
    this.fontSizeRechazar--;
    
    if (!this.rechazadoPrimeraVez && this.ratioRespuestas > 0) {
      this.ratioRespuestas = 0;
      this.fontSizeAceptar *= 2;
      this.rechazadoPrimeraVez = true;
    }
    this.fontSizeAceptar += 8;
    this.ratioRespuestas--;

    if (this.fontSizeRechazar <= 0) {
      this.desaparecer = true;
    }
  }

  form: FormGroup = this.fb.group({
    mensajeAEnviar: ['', [Validators.required]]
  });

  enviarMensaje() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      window.location.href = `https://api.whatsapp.com/send/?text=${this.form.get('mensajeEnviar')?.value}&type=phone_number&app_absent=0`;
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <div class="footer-container">
        <section class="bloque1">
          <p>SIGUENOS</p>
          <ul>
            <li>
              <a href="#" target="_blank"
                ><img
                  src="../../../assets/facebook.png"
                  alt="Facebook logo"
                  width="20px"
              /></a>
            </li>

            <li>
              <a href="#" target="_blank"
                ><img
                  src="../../../assets/instagram.png"
                  alt="Instagram logo"
                  width="20px"
              /></a>
            </li>
            <li>
              <a href="#" target="_blank"
                ><img
                  src="../../../assets/linkind.png"
                  alt="linkedin logo"
                  width="20px"
              /></a>
            </li>
          </ul>
        </section>
        <section class="section-bloque-2">
          <div class="bloque2">
            <P>SOPORTE</P>
            <P>POLITICAS</P>
            <P>TERMINOS</P>
          </div>
          <div class="text-bloque2">
            <p>DISEÑADO Y DESARROLLADO EN MADRID - ISDI-CODERS</p>
          </div>
        </section>
      </div>
      <address>© Copyright watchsAngelo, 2024</address>
    </footer>
  `,
  styleUrl: './footer.component.css',
})
export class FooterComponent {}

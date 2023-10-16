export function distance(x1: number, x2: number, y1: number, y2:number): number{
  return Math.sqrt((x2 - x1)* (x2 - x1) + (y2 - y1) * (y2 - y1))
}

class Complex {
  re;
  im;
  constructor(a: number, b:number) {
    this.re = a;
    this.im = b;
  }

  add(c: Complex) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c: Complex) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

export function dft(x: number[][]) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      const c = new Complex(Math.cos(phi), -Math.sin(phi));
      sum.add(new Complex(x[n][0], x[n][1]).mult(c));
    }
    sum.re = sum.re / N;
    sum.im = sum.im / N;

    let freq = k;
    let amp = Math.sqrt(sum.re * sum.re + sum.im * sum.im);
    let phase = Math.atan2(sum.im, sum.re);
    X[k] =  {x: sum.re, y: sum.im, freq, amp, phase};
  }
  return X.sort((a, b) => b.amp - a.amp);
}

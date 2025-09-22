<template>
    <section class="card">
        <section class="card">
            <h1 class="title">Punto de Venta</h1>
            <section class="card">
                <Button label="Secondary" severity="secondary" raised />
            </section>
        </section>
    </section>
</template>

<script>
export default {
  name: "RfcForm",
  data() {
    return {
      nombreProducto: "",
      cantProducto: "",
      precioUnitario: "",
      fecha: "",
      rfc: ""
    };
  },
  methods: {
    generarRFC() {
      const nom = this.nombre.trim().toUpperCase();
      const apP = this.apellidoP.trim().toUpperCase();
      const apM = this.apellidoM.trim().toUpperCase();
      const fecha = this.fecha.replaceAll("-", "").slice(2); // YYMMDD
      this.rfc = apP.slice(0, 2) + (apM[0] || "") + (nom[0] || "") + fecha;
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 920px;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 1px solid #eef1f5;
}
</style>
<template>
    <section class="card">
        <h1 class="title">Punto de Venta</h1>
        <section class="card inputtext">
            <InputText type="text" v-model="nombreProducto" style="background-color: white; color: gray;" />
            <InputText type="text" v-model="cantProducto" style="background-color: white; color: gray;" />
            <InputText type="text" v-model="precioUnitario" style="background-color: white; color: gray;" />
            <Button label="Save" icon="pi pi-check" style="max-width: 200px;" />
        </section>
        <section class="card">
          <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">

            <Column field="name" header="Cns" style="width: 10%"></Column>
            <Column field="country.name" header="Nombre del producto" style="width: 40%"></Column>
            <Column field="company" header="Precio U." style="width: 15%"></Column>
            <Column field="representative.name" header="Precio P." style="width: 15%"></Column>
            <Column field="representative.name" header="Acciones" style="width: 20%">
            </Column>

          </DataTable>
        </section>
        <section class="card finalPrice">

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>Subtotal</h4>
              <InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid />
            </section>

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>IVA (16%)</h4>
              <InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid />
            </section>

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>Total</h4>
              <InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid />
            </section>

        </section>      
    </section>
</template>

<script>
export default {
  name: "RfcForm",
  data() {
    return {
      value: "",
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

.title {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.inputtext {
  display: flex;
  flex-direction: row;
  gap: 36px; 
}

.finalPrice{
  display: flex;
  flex-direction: row;
  align-items: right;
  /*max-height: 63px; */
  gap: 36px;
}

</style>
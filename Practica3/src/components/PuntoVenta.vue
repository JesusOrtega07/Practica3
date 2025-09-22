<template>
    <section class="card">
        <h1 class="title">Punto de Venta</h1>
        <section class="card inputtext"> 
            <InputText type="text" v-model="nombreProducto" placeholder="Nombre del producto" style="background-color: white; color: gray;" />
            <InputText type="text" v-model="cantProducto" placeholder="Cantidad" style="background-color: white; color: gray;" />
            <InputText type="text" v-model="precioUnitario" placeholder="Precio Unitario" style="background-color: white; color: gray;" />
            <Button :label="isEditing ? 'Update' : 'Save'" :icon="isEditing ? 'pi pi-check' : 'pi pi-check'" style="max-width: 200px;" @click="addProduct" />
            <Button v-if="isEditing" label="Cancel" icon="pi pi-times" severity="secondary" style="max-width: 200px; margin-left: 8px;" @click="cancelEdit" />
        </section>
        <section class="card">
          <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">

            <Column field="consecutivo" header="Cns" style="width: 10%"></Column>
            <Column field="nombre" header="Nombre del producto" style="width: 30%"></Column>
            <Column field="precioUnitario" header="Precio U." style="width: 15%">
              <template #body="{ data }">
                ${{ data.precioUnitario.toFixed(2) }}
              </template>
            </Column>
            <Column field="cantidad" header="Cant" style="width: 10%"></Column>
            <Column field="precioTotal" header="Precio P." style="width: 15%">
              <template #body="{ data }">
                ${{ data.precioTotal.toFixed(2) }}
              </template>
            </Column>
            <Column header="Acciones" style="width: 20%">
              <template #body="{ data, index }">
                <Button icon="pi pi-pencil" severity="info" size="small" @click="editProduct(index)" style="margin-right: 8px;" />
                <Button icon="pi pi-trash" severity="danger" size="small" @click="removeProduct(index)" />
              </template>
            </Column>

          </DataTable>
        </section>
        <section class="card finalPrice">

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>Subtotal</h4>
                <InputNumber :modelValue="subtotal" inputId="subtotal" mode="currency" currency="MXN" locale="es-MX" fluid readonly />
            </section>

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>IVA (16%)</h4>
                <InputNumber :modelValue="iva" inputId="iva" mode="currency" currency="MXN" locale="es-MX" fluid readonly />
            </section>

            <section style="display: flex; flex-direction: row; gap: 5px;">
              <h4>Total</h4>
                <InputNumber :modelValue="total" inputId="total" mode="currency" currency="MXN" locale="es-MX" fluid readonly />
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
      rfc: "",
      products: [],
      consecutivo: 1,
      editingIndex: -1,
      isEditing: false
    };
  },
  computed: {
    subtotal() {
      return this.products.reduce((sum, product) => sum + product.precioTotal, 0);
    },
    iva() {
      return this.subtotal * 0.16;
    },
    total() {
      return this.subtotal + this.iva;
    }
  },
  methods: {
    addProduct() {
      if (this.nombreProducto && this.cantProducto && this.precioUnitario) {
        const cantidad = parseFloat(this.cantProducto);
        const precioUnitario = parseFloat(this.precioUnitario);
        const precioTotal = cantidad * precioUnitario;
        
        if (this.isEditing) {
          const updatedProduct = {
            consecutivo: this.products[this.editingIndex].consecutivo,
            nombre: this.nombreProducto,
            precioUnitario: precioUnitario,
            cantidad: cantidad,
            precioTotal: precioTotal
          };
          
          this.products[this.editingIndex] = updatedProduct;
          this.isEditing = false;
          this.editingIndex = -1;
        } else {
          const newProduct = {
            consecutivo: this.consecutivo,
            nombre: this.nombreProducto,
            precioUnitario: precioUnitario,
            cantidad: cantidad,
            precioTotal: precioTotal
          };
          
          this.products.push(newProduct);
          this.consecutivo++;
        }
        
        this.nombreProducto = "";
        this.cantProducto = "";
        this.precioUnitario = "";
      }
    },
    editProduct(index) {
      const product = this.products[index];
      this.nombreProducto = product.nombre;
      this.cantProducto = product.cantidad.toString();
      this.precioUnitario = product.precioUnitario.toString();
      this.isEditing = true;
      this.editingIndex = index;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingIndex = -1;
      this.nombreProducto = "";
      this.cantProducto = "";
      this.precioUnitario = "";
    },
    removeProduct(index) {
      this.products.splice(index, 1);
      if (this.editingIndex === index) {
        this.cancelEdit();
      } else if (this.editingIndex > index) {
        this.editingIndex--;
      }
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
  max-height: 120px;
  gap: 36px;
}

</style>
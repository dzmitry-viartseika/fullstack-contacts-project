<template>
  <div class="home">
    <div class="container pt-3">
      <h1>REST API</h1>
      <form class="form-inline mb-3"
            @submit.prevent="createContact()"
      >
        <div class="form-group mr-5">
          <label for="name" class="mr-3">Имя</label>
          <input type="text" class="form-control" id="name" v-model="form.name">
        </div>
        <div class="form-group mr-5">
          <label for="value" class="mr-3">Значение</label>
          <input type="text" class="form-control" id="value" v-model="form.value">
        </div>
        <button class="btn btn-primary" type="submit"
                :disabled="!canCreate"
        >Создать</button>
      </form>
    </div>
    <div>
      <LoaderTemplate v-if="isLoader"/>
      <div v-else-if="contacts.length !== 0">
        <transition name="fade-el">
          <div class="card mb-3">
            <div class="card-body"
                 v-for="contact in contacts"
                 :key="contact.id"
            >
              <h5 class="card-title"
                  :style="{color: contact.marked ? 'red' : 'gray'}"
              >{{ contact.name }}</h5>
              <p class="card-text">{{ contact.value }}</p>
              <button class="btn btn-primary"
                      @click="markContact(contact.id)"
                      :disabled="contact.marked"
              >Отметить</button>
              <button class="btn btn-danger"
                      @click="removeContact(contact.id)"
              >Удалить</button>
            </div>
          </div>
        </transition>
      </div>
      <div v-else>
        Контактов нет!
      </div>
    </div>
  </div>
</template>

<script>
import contactApi from '../api/contactApi';
import LoaderTemplate from '../components/LoaderTemplate.vue';

export default {
  name: 'Home',
  data() {
    return {
      form: {
        name: '',
        value: '',
        marked: false,
      },
      contacts: [],
      isLoader: false,
    };
  },
  components: {
    LoaderTemplate,
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim();
    },
  },
  methods: {
    createContact() {
      const { ...contact } = this.form;
      contactApi.addNewContact(contact)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      this.form.name = '';
      this.form.value = '';
    },
    removeContact(id) {
      contactApi.deleteContact(id)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.err(err);
        });
    },
    async markContact(id) {
      const contact = this.contacts.find((item) => item.id === id);
      await contactApi.changeMark(id, {
        ...contact,
        marked: true,
      })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.err(err);
        });
      contact.marked = true;
    },
  },
  async mounted() {
    this.isLoader = true;
    await contactApi.getAllContacts()
      .then((response) => {
        console.log('response', response.data);
        this.contacts = response.data;
        this.isLoader = false;
      });
  },
};
</script>

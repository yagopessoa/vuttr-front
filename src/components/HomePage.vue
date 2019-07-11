<template>
  <v-container>
    <v-layout wrap mt-4 pb-4>
      <v-flex 
        my-4
        xs12
        sm10 offset-sm1
        md8 offset-md2
        xl6 offset-xl3
      >

        <!-- Header -->
        <h1 class="display-3 font-weight-bold mb-2">
          VUTTR
        </h1>
        <p class="display-1 mb-4">Very Useful Tools to Remember</p>

        <!-- Search options -->
        <v-flex pt-4 class="search-container">
          <v-text-field
            prepend-inner-icon="search"
            placeholder="Type what you are searching for..."
            solo
            class="input-text mr-4 mb-4"
            style="max-width: 286px;"
            v-model="searchParameter"
            @input="loadTools()"
          ></v-text-field>

          <div class="toggle-container mb-4">
            <toggle-button :value="false"
              :width="40"
              color="#12DB89"
              :sync="true"
              :labels="false"
              class="pr-2"
              v-model="searchTagsOnly"
              @change="loadTools()"
            />
            <p class="subheading mt-1 mb-0">Search in tags only</p>
          </div>

          <v-spacer></v-spacer>
          <v-btn class="info ma-0 mb-4" @click="addToolDialog=true">
            <v-icon left small>add</v-icon>Add
          </v-btn>
        </v-flex>

        <!-- Card list of tools -->
        <v-flex v-if="!loading">
          <p class="pa-2 pt-4 mt-4 text-xs-center" v-if="apiError">
            <v-icon class="primary--text pa-2 mt-2" large>cloud_off</v-icon><br/>
            Oh no! It seems we couldn't connect to our server x(
          </p>
          <div class="pa-2 pt-4 mt-4 text-xs-center" v-if="tools.length == 0 && !apiError">
            <div v-if="searchParameter != ''">
              No tools matching your search parameters. Try remodel your search.
            </div>
            <div v-else>
              Ops. We have no tools to show :( <br/>
              You can add a new one by clicking on the "+ Add" button!
            </div>
          </div>
          <v-card class="mt-2" v-for="tool in tools" :key="tool.id">
            <v-card-title primary-title>
              <a :href="tool.link" target="_blank"><h3 class="headline primary--text">{{ tool.title }}</h3></a>
              <v-spacer></v-spacer>
              <v-btn flat color="error" @click="handleRemoveTool(tool)">
                <v-icon left small>close</v-icon>Remove
              </v-btn>
            </v-card-title>

            <v-card-text class="py-0">
              {{ tool.description }}
            </v-card-text>

            <div class="tags-container" v-if="tool.tags.length > 0">
              <v-chip v-for="(tag, index) in tool.tags" :key="index">
                <b>#{{ tag }}</b>
              </v-chip>
            </div>
          </v-card>
        </v-flex>
        <v-flex class="text-xs-center mt-4 pt-4" v-else>
          <v-progress-circular color="info" indeterminate></v-progress-circular>
        </v-flex>
        
      </v-flex>
    </v-layout>

    <!-- Remove confirmation dialog -->
    <template>
      <div class="text-xs-center">
        <v-dialog
          v-model="removeDialog"
          class="primary--text"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline primary--text"
              primary-title
            >
              Remove tool
            </v-card-title>

            <v-card-text>
              Are you sure you want to remove <b>{{ selectedTool.title }}</b>?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                flat
                @click="removeDialog=false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="error"
                @click="removeTool(selectedTool.id)"
              >
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

    <!-- Add new tool dialog -->
    <template>
      <div class="text-xs-center">
        <v-dialog
          v-model="addToolDialog"
          class="primary--text"
          width="600"
        >
          <v-card>
            <v-card-title
              class="headline primary--text"
              primary-title
            >
              Add new tool
            </v-card-title>

            <v-card-text>

              <div style="display: flex" class="body-2">
                <div class="primary--text pa-1">Tool Name</div><div class="secondary--text">*</div>
              </div>
              <v-form
                ref="titleForm"
                v-model="titleFormValid"
                lazy-validation
              >
                <v-text-field
                  solo
                  placeholder="Required..."
                  v-model="addToolTitle"
                  :class="formTitleClasses"
                  :rules="inputRules"
                  required
                ></v-text-field>
              </v-form>

              <div style="display: flex" class="body-2">
                <div class="primary--text pa-1">Tool Link</div><div class="secondary--text">*</div>
              </div>
              <v-form
                ref="linkForm"
                v-model="linkFormValid"
                lazy-validation
              >
                <v-text-field
                  solo
                  placeholder="Required..."
                  v-model="addToolLink"
                  :class="formLinkClasses"
                  :rules="inputRules"
                  required
                ></v-text-field>
              </v-form>

              <div style="display: flex" class="body-2">
                <div class="primary--text pa-1">Tool Description</div>
              </div>
              <v-text-field
                solo
                placeholder="Optional..."
                v-model="addToolDescription"
                class="input-text mb-4"
              ></v-text-field>

              <div style="display: flex" class="body-2">
                <div class="primary--text pa-1">Tags</div>
              </div>
              <v-text-field
                solo
                placeholder="Optional..."
                v-model="addToolTags"
                class="input-text mb-4"
              ></v-text-field>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="error"
                @click="addToolDialog=false; resetForm()"
              >
                Cancel
              </v-btn>
              <v-btn
                color="success"
                @click="addTool(); addToolDialog=false"
                :disabled="!isFormValid"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>

  </v-container>
</template>

<script>
  const axios = require('axios')
  const apiPath = process.env.VUE_APP_API_PATH
  export default {
    mounted() {
      this.mounted = true
      this.loadTools()
    },
    data: () => ({
      mounted: false,
      apiError: false,
      tools: [],
      searchTagsOnly: false,
      searchParameter: '',
      loading: true,
      removeDialog: false,
      selectedTool: {
        title: '',
        link: '',
        description: '',
        tags: []
      },
      addToolDialog: false,
      inputRules: [
        v => !!v || 'This field is required'
      ],
      titleFormValid: true,
      linkFormValid: true,
      addToolTitle: '',
      addToolLink: '',
      addToolDescription: '',
      addToolTags: ''
    }),
    methods: {
      loadTools() {
        this.loading = true
        axios
          .get(apiPath + (this.searchTagsOnly ? '/tools?tags_like=' : '/tools?q=') + this.searchParameter)
          .then(response => {
            this.tools = response.data
            this.apiError = false
            this.loading = false
          })
          .catch(() => {
            this.apiError = true
            this.loading = false
          })
      },
      handleRemoveTool(tool) {
        this.selectedTool = tool
        this.removeDialog = true
      },
      removeTool(id) {
        this.removeDialog = false
        axios
          .delete(apiPath + '/tools/' + id)
          .then(() => {
            this.loadTools()
          })
      },
      resetForm() {
        this.$refs.titleForm.reset()
        this.$refs.linkForm.reset()
        this.addToolDescription = ''
        this.addToolTags = ''
      },
      addTool() {
        const { addToolTitle, addToolLink, addToolDescription, addToolTags } = this
        axios
          .post(apiPath + '/tools', {
            'title': addToolTitle,
            'link': addToolLink,
            'description': addToolDescription,
            'tags': addToolTags != '' ? addToolTags.split(' ') : []
          })
          .then(() => {
            this.resetForm()
            this.loadTools()
          })
          .catch(err => {
            this.resetForm()
            // eslint-disable-next-line
            console.log(err)
          })
        
      }
    },
    computed: {
      formTitleClasses() {
        let baseClasses = 'input-text mb-4'
        if(this.mounted && this.$refs.titleForm.validate()) 
          return baseClasses
        else return baseClasses += ' input-error'
      },
      formLinkClasses() {
        let baseClasses = 'input-text mb-4'
        if(this.mounted && this.$refs.linkForm.validate()) 
          return baseClasses
        else return baseClasses += ' input-error'
      },
      isFormValid() {
        if(this.mounted) return this.$refs.titleForm.validate()
          && this.$refs.linkForm.validate()
        else return false
      },
    },
  }
</script>

<style>
  .search-container {
    display: flex;
    align-items: center;
  }
  .input-text {
    width: 100%;
    max-height: 48px;
  }
  .v-messages__message {
    float: right;
  }
  .input-error > .v-input__control > .v-input__slot { 
    background-color: #FEEFEE !important;
    border: #F95E5A solid 1px !important;
  }
  .toggle-container {
    display: flex;
    align-items: center;
  }
  .tags-container {
    padding: 8px;
  }

  @media only screen and (max-width: 830px) {
    .search-container {
      flex-direction: column;
      align-items: flex-start;
    }
    .input-text {
      min-width: 100%;
    }
  }
</style>

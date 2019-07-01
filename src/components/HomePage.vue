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
            class="search-input mr-4 mb-4"
          ></v-text-field>

          <div class="toggle-container mb-4">
            <toggle-button :value="false"
              :width="40"
              color="#12DB89"
              :sync="true"
              :labels="false"
              class="pr-2"
            />
            <p class="subheading mt-1 mb-0">Search in tags only</p>
          </div>

          <v-spacer></v-spacer>
          <v-btn class="info ma-0 mb-4"><v-icon left small>add</v-icon>Add</v-btn>
        </v-flex>

        <!-- Card list of tools -->
        <v-card class="mt-2" v-for="tool in tools" :key="tool.id">
          <v-card-title primary-title>
              <a :href="tool.link" target="_blank"><h3 class="headline primary--text">{{ tool.title }}</h3></a>
              <v-spacer></v-spacer>
              <v-btn flat color="error"><v-icon left small>close</v-icon>Remove</v-btn>
          </v-card-title>

          <v-card-text class="py-0">
            {{ tool.description }}
          </v-card-text>

          <div class="tags-container">
            <v-chip v-for="(tag, index) in tool.tags" :key="index">
              <b>#{{ tag }}</b>
            </v-chip>
          </div>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      tools: [
        {
          id: 1,
          title: "Notion",
          link: "https://notion.so",
          description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
          tags: [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
          ]
        },
        {
          id: 2,
          title: "json-server",
          link: "https://github.com/typicode/json-server",
          description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
          tags: [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
          ]
        },
        {
          id: 3,
          title: "fastify",
          link: "https://www.fastify.io/",
          description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
          tags: [
            "web",
            "framework",
            "node",
            "http2",
            "https",
            "localhost"
          ]
        }
      ]
    })
  }
</script>

<style>
  .search-container {
    display: flex;
    align-items: center;
  }
  .search-input {
    min-width: 286px;
    max-width: 286px;
    max-height: 48px;
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
    .search-input {
      min-width: 100%;
    }
  }
</style>

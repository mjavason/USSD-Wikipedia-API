# USSD Wikipedia API

A versatile USSD-based API designed to deliver Wikipedia topic summaries to users via text menus. This API simplifies access to knowledge, making it readily available through mobile phones without the need for an internet connection. Hosted live at [USSD Wikipedia API](https://ussd-wikipedia.onrender.com).

## Overview

The USSD Wikipedia API offers a user-friendly way to access Wikipedia's wealth of knowledge. Users can interact via text menus to receive concise summaries of topics of their choice, all without an internet connection. This project simplifies knowledge acquisition and bridges the digital divide.

## Getting Started

To set up and utilize the USSD Wikipedia API, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/mjavason/USSD-Wikipedia-API.git
   ```

2. Navigate to the project directory:

   ```shell
   cd USSD-Wikipedia-API
   ```

3. Install dependencies:

   ```shell
   npm install
   ```

4. Set up your environment variables in a `.env` file with the following variables (replace placeholders with actual values):

   ```env
    API_DOCUMENTATION_URL=doc.xxx.com
    APP_NAME=USSD Wikipedia API
    MAIL_ADDRESS=xxxx@mail.com
    MAIL_PASSWORD=xxxx
    SITE_LINK=xxxx
    USERNAME=user@mail.com
   ```

5. Build the application:

   ```shell
   npm run build
   ```

6. Start the server:

   ```shell
   npm start
   ```

The USSD Wikipedia API will be accessible at `http://localhost:5000` by default.

## Features

- **USSD-Based Knowledge Access**: Deliver Wikipedia summaries via USSD text menus, making information accessible without an internet connection.

- **User-Friendly Interaction**: Users can navigate text menus to select topics and receive summary information effortlessly.

- **Simplified Knowledge Acquisition**: Bridge the digital divide by providing easy access to knowledge for users with limited internet access.

## Sample Scenario

**User Scenario**:
Imagine a user wants to learn about "Space Exploration." They will use their mobile phone to access information about this topic using USSD.

**USSD Code Flow**:

1. **User Dials**: User dials the USSD code to initiate the service. Let's say the USSD code is `*123#`.

2. **Welcome Message**: The user receives a welcome message:

   ```
   Welcome to USSD Wikipedia!
   Please enter the topic you'd like to learn about or type '0' to exit.
   ```

3. **User Input**: The user enters `Space Exploration` as the topic of interest.

4. **Processing Request**: The USSD service processes the user's input and communicates with the USSD Wikipedia API.

5. **Result**: The user receives a summary on the topic "Space Exploration" through a series of text menus. The API retrieves information from Wikipedia and presents it step by step:

   ```
   - Space Exploration -
   1. Introduction
   2. History
   3. Notable Missions
   4. Future of Space Exploration
   5. Exit

   Reply with the corresponding number to learn more or '5' to exit.
   ```

6. **User Interaction**: The user can reply with the number corresponding to their choice to get more detailed information. For example, if they reply with '1', they will receive an introduction to Space Exploration.

7. **User Exploration**: The user can navigate through various menu options, exploring the topic at their own pace.

8. **Exiting**: When the user is done, they can type '5' to exit the USSD service.

This sample scenario demonstrates how users can easily access Wikipedia topic summaries via USSD text menus, making knowledge readily available on their mobile phones without an internet connection.

## Contributing

Contributions to the USSD Wikipedia API are highly welcomed. To contribute:

1. Fork the project on GitHub.

2. Create a new branch for your changes.

3. Implement your improvements or additions.

4. Thoroughly test your changes.

5. Submit a pull request with a clear description of your modifications.

Your contributions will help make knowledge more accessible to a broader audience.

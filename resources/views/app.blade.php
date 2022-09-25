<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>APP NAME</title>

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        @vite('resources/css/app.css')
        <style></style>

    </head>
    <body class="antialiased">
        <div id="app">
            <router-view></router-view>
        </div>
        <!-- scriptes -->
        @vite('resources/js/app.js')
        <script></script>
    </body>
</html>

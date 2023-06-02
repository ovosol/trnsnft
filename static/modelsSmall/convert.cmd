for /r . %%i in (*.png) do magick convert "%%i" -background "#eaeaec" -flatten "%%~dpi%%~ni.jpg"

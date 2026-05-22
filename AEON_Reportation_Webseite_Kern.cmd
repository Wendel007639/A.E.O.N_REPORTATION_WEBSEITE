@echo off
setlocal EnableExtensions

set "WT_PROFILE=Git Bash"
set "GITBASH=C:\Program Files\Git\bin\bash.exe"

rem Exakt der von dir genannte Pfad
set "PROJECT_WIN=C:\Dev\A.E.O.N Reportation Webseite"
set "PROJECT_DIR=/c/Dev/A.E.O.N Reportation Webseite"

set "BASHRC_WIN=%PROJECT_WIN%\.aeon_reportation_webseite_bashrc"
set "INPUTRC_WIN=%PROJECT_WIN%\.aeon_reportation_webseite_inputrc"

if not exist "%GITBASH%" (
    echo Git Bash nicht gefunden:
    echo "%GITBASH%"
    pause
    exit /b 1
)

if not exist "%PROJECT_WIN%" (
    echo A.E.O.N Reportation Webseite Ordner nicht gefunden:
    echo "%PROJECT_WIN%"
    echo.
    echo Pruefe den Ordnernamen. In deiner Struktur steht eventuell:
    echo C:\Dev\A.E.O.N-Reportation-Webseite
    pause
    exit /b 1
)

where node.exe >nul 2>nul
if errorlevel 1 (
    echo WARNUNG: Node.js wurde im PATH nicht gefunden.
    echo Die Webseite kann ohne Node.js nicht gebaut oder gestartet werden.
    echo.
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
    echo WARNUNG: npm wurde im PATH nicht gefunden.
    echo npm run dev, npm run build und npm run lint funktionieren dann nicht.
    echo.
)

> "%INPUTRC_WIN%" (
    echo set enable-bracketed-paste on
    echo set bell-style none
    echo set completion-ignore-case on
    echo set show-all-if-ambiguous on
    echo set colored-stats on
    echo set input-meta on
    echo set output-meta on
    echo set convert-meta off
)

> "%BASHRC_WIN%" (
    echo set +e
    echo set +H
    echo set +o pipefail 2^>/dev/null ^|^| true
    echo stty -ixon 2^>/dev/null ^|^| true
    echo export AEON_WEB_DIR="%PROJECT_DIR%"
    echo bind -f "%PROJECT_DIR%/.aeon_reportation_webseite_inputrc" 2^>/dev/null ^|^| true
    echo bind 'set enable-bracketed-paste on' 2^>/dev/null ^|^| true
    echo cd "%PROJECT_DIR%"
    echo alias webcd='cd "%PROJECT_DIR%"'
    echo alias cls='clear'
    echo alias ll='ls -la'
    echo alias tree1='find . -maxdepth 2 -type d ^| sort'
    echo alias webdev='npm run dev'
    echo alias webbuild='npm run build'
    echo alias weblint='npm run lint'
    echo alias webstart='npm run start'
    echo alias webstatus='git status --short 2^>/dev/null ^|^| true'
    echo alias webproof='cat src/data/latest-proof.json 2^>/dev/null ^| head -80'
    echo clear
    echo printf '\033[96m==============================================\033[0m\n'
    echo printf '\033[96m A.E.O.N Reportation Webseite Kern bereit\033[0m\n'
    echo printf '\033[96m==============================================\033[0m\n\n'
    echo echo "Pfad: %PROJECT_DIR%"
    echo echo
    echo echo "Befehle:"
    echo echo "  webdev     = Entwicklungsserver starten"
    echo echo "  webbuild   = Produktionsbuild pruefen"
    echo echo "  weblint    = Lint pruefen"
    echo echo "  webstatus  = Git Status"
    echo echo "  webproof   = latest-proof.json anzeigen"
    echo echo
    echo if [ -f package.json ]; then echo "package.json gefunden."; else echo "WARNUNG: package.json fehlt."; fi
    echo if [ -d src/app ]; then echo "src/app gefunden."; else echo "WARNUNG: src/app fehlt."; fi
    echo if [ -d evidence ]; then echo "evidence Ordner gefunden."; else echo "WARNUNG: evidence Ordner fehlt."; fi
    echo echo
)

where wt.exe >nul 2>nul
if errorlevel 1 (
    for /L %%N in (1,1,3) do (
        start "A.E.O.N Reportation Webseite Kern %%N" "%GITBASH%" --rcfile "%BASHRC_WIN%" -i
        timeout /t 1 /nobreak >nul
    )
    exit /b 0
)

for /L %%N in (1,1,3) do (
    start "" wt.exe -w new -p "%WT_PROFILE%" --title "A.E.O.N Reportation Webseite Kern %%N" "%GITBASH%" --rcfile "%BASHRC_WIN%" -i
    timeout /t 1 /nobreak >nul
)

exit /b 0

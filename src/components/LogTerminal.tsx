import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

interface LogTerminalProps {
    fileId: string;
}

function LogTerminal({ fileId }: LogTerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const termRef = useRef<Terminal | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const url = `${protocol}://${location.host}/api/logs/ws/${fileId}`;

    useEffect(() => {
        if (!terminalRef.current) return;

        const term = new Terminal({
            cursorBlink: false,
            disableStdin: true,
            convertEol: true,
            theme: {
                background: "#1e1e1e",
                foreground: "#d4d4d4",
            },
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();
        termRef.current = term;

        const resizeObserver = new ResizeObserver(() => {
            fitAddon.fit();
        });
        resizeObserver.observe(terminalRef.current);

        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const line = JSON.parse(event.data);
            term.writeln(line.data);
        };

        ws.onclose = () => {
            term.writeln("\r\n\x1b[33m[disconnected]\x1b[0m");
        };

        ws.onerror = () => {
            term.writeln("\r\n\x1b[31m[connection error]\x1b[0m");
        };

        return () => {
            resizeObserver.disconnect();
            ws.close();
            term.dispose();
        };
    }, [url]);

    return (
        <div
            ref={terminalRef}
            style={{ height: "100%", minHeight: "400px" }}
        />
    );
}

export default LogTerminal;

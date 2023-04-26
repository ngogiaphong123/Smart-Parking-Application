import { io } from 'socket.io-client';
import serverUrl from '../redux/urls/urls';

const socket = io(serverUrl);

export default socket

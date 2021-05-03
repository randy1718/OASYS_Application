TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `deleteSolicitudJugador` AFTER INSERT ON `jugadores`\n FOR EACH ROW DELETE FROM solicitudesJugador WHERE Cedula_Jugador = NEW.Cedula'
sql_modes=524288
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8mb4_general_ci'
created=159059718328

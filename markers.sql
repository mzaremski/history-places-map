-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 06 Sty 2018, 00:05
-- Wersja serwera: 10.1.25-MariaDB
-- Wersja PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `historymap`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `markers`
--

CREATE TABLE `markers` (
  `id` int(11) NOT NULL,
  `placeName` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `placeDesc` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(20) NOT NULL,
  `placeContent` varchar(10000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `placePictureURL` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `placeWikiURL` varchar(1000) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `markers`
--

INSERT INTO `markers` (`id`, `placeName`, `placeDesc`, `type`, `placeContent`, `placePictureURL`, `placeWikiURL`, `lat`, `lng`) VALUES
(1, 'Kościół Mariacki', 'At aliquam magnam doloribus alias temporibus, quae a sint facere hic sapiente, voluptatibus ea eum fugiat', 'church', '{\"ops\":[{\"insert\":\"Deleniti sequi ipsa\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nNesciunt hic quisquam similique eligendi eveniet corrupti, illo voluptates modi incidunt culpa id. Eligendi, deserunt commodi qui quaerat provident sapiente ea ad praesentium obcaecati aspernatur nostrum.\\n\\n\"},{\"attributes\":{\"italic\":true},\"insert\":\"Voluptatum dolores ratione, possimus quia nam animi perspiciatis quas. Natus error perspiciatis repellat eligendi! Atque obcaecati eos nobis \"},{\"insert\":\"\\n\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"Recusandae dolorum ipsa\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nVeniam molestias voluptate quod, voluptatibus, eaque accusamus voluptates possimus! Iure quae corporis blanditiis, commodi in incidunt excepturi esse maxime, possimus.\\n\\n\"},{\"attributes\":{\"color\":\"#f06666\",\"bold\":true},\"insert\":\"Quas repellat doloremque molestiae\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"underline\":true},\"insert\":\"Ratione assumenda doloribus\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nNisi magnam recusandae, amet eos obcaecati iste saepe! Possimus dignissimos fuga voluptatem, quasi deserunt omnis temporibus, iusto aliquid a ad cum maxime similique sit doloribus minima molestiae magni fugiat libero rem tempore vero quo mollitia id, delectus ut. Suscipit mollitia facilis ipsum, iure voluptatem.\\n\\nAmet vero numquam, quisquam, praesentium esse quas vitae. Veritatis deserunt cum harum doloremque odio aliquid tenetur quos dolor, libero placeat sed, explicabo, minima similique repellendus modi quaerat voluptates itaque ducimus dolore laboriosam cumque ipsum. Nemo eius officia iure, voluptatum voluptas enim saepe porro id rerum ab omnis dicta alias, maiores quos rem officiis assumenda provident autem facere culpa itaque nihil! \\n\\n\"},{\"attributes\":{\"underline\":true,\"italic\":true,\"color\":\"#444444\",\"bold\":true},\"insert\":\"Impedit eaque quis dolorum, magnam quas. Aliquam, iusto.\"},{\"insert\":\"\\n\"}]}', 'http://mariacki.com/wp-content/uploads/bazylika_big.jpg', 'https://pl.wikipedia.org/wiki/Ko%C5%9Bci%C3%B3%C5%82_archiprezbiterialny_Wniebowzi%C4%99cia_Naj%C5%9Bwi%C4%99tszej_Marii_Panny_w_Krakowie', 50.1616, 23.1199),
(2, 'Pomnik', 'Sint facere hic sapiente, voluptatibus ea eum fugiat', 'monument', '{\"ops\":[{\"insert\":\"Deleniti sequi ipsa\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nNesciunt hic quisquam similique eligendi eveniet corrupti, illo voluptates modi incidunt culpa id. Eligendi, deserunt commodi qui quaerat provident sapiente ea ad praesentium obcaecati aspernatur nostrum.\\n\\n\"},{\"attributes\":{\"italic\":true},\"insert\":\"Voluptatum dolores ratione, possimus quia nam animi perspiciatis quas. Natus error perspiciatis repellat eligendi! Atque obcaecati eos nobis \"},{\"insert\":\"\\n\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"Recusandae dolorum ipsa\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nVeniam molestias voluptate quod, voluptatibus, eaque accusamus voluptates possimus! Iure quae corporis blanditiis, commodi in incidunt excepturi esse maxime, possimus.\\n\\n\"},{\"attributes\":{\"color\":\"#f06666\",\"bold\":true},\"insert\":\"Quas repellat doloremque molestiae\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"underline\":true},\"insert\":\"Ratione assumenda doloribus\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nNisi magnam recusandae, amet eos obcaecati iste saepe! Possimus dignissimos fuga voluptatem, quasi deserunt omnis temporibus, iusto aliquid a ad cum maxime similique sit doloribus minima molestiae magni fugiat libero rem tempore vero quo mollitia id, delectus ut. Suscipit mollitia facilis ipsum, iure voluptatem.\\n\\nAmet vero numquam, quisquam, praesentium esse quas vitae. Veritatis deserunt cum harum doloremque odio aliquid tenetur quos dolor, libero placeat sed, explicabo, minima similique repellendus modi quaerat voluptates itaque ducimus dolore laboriosam cumque ipsum. Nemo eius officia iure, voluptatum voluptas enim saepe porro id rerum ab omnis dicta alias, maiores quos rem officiis assumenda provident autem facere culpa itaque nihil! \\n\\n\"},{\"attributes\":{\"underline\":true,\"italic\":true,\"color\":\"#444444\",\"bold\":true},\"insert\":\"Impedit eaque quis dolorum, magnam quas. Aliquam, iusto.\"},{\"insert\":\"\\n\"}]}', 'http://bi.gazeta.pl/im/02/88/15/z22577410V,Pomnik-papieza-Jana-Pawla-II-w-Ploermel.jpg', 'https://pl.wikipedia.org/wiki/Lubacz%C3%B3w', 50.1549, 23.1185),
(5, 'Zamek', 'Zamek Lubaczowski', 'museum', '{\"ops\":[{\"insert\":\"Deleniti sequi ipsa\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nNesciunt hic quisquam similique eligendi eveniet corrupti, illo voluptates modi incidunt culpa id. Eligendi, deserunt commodi qui quaerat provident sapiente ea ad praesentium obcaecati aspernatur nostrum.\\n\\n\"},{\"attributes\":{\"italic\":true},\"insert\":\"Voluptatum dolores ratione, possimus quia nam animi perspiciatis quas. Natus error perspiciatis repellat eligendi! Atque obcaecati eos nobis \"},{\"insert\":\"\\n\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"Recusandae dolorum ipsa\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nVeniam molestias voluptate quod, voluptatibus, eaque accusamus voluptates possimus! Iure quae corporis blanditiis, commodi in incidunt excepturi esse maxime, possimus.\\n\\n\"},{\"attributes\":{\"color\":\"#f06666\",\"bold\":true},\"insert\":\"Quas repellat doloremque molestiae\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"underline\":true},\"insert\":\"Ratione assumenda doloribus\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nNisi magnam recusandae, amet eos obcaecati iste saepe! Possimus dignissimos fuga voluptatem, quasi deserunt omnis temporibus, iusto aliquid a ad cum maxime similique sit doloribus minima molestiae magni fugiat libero rem tempore vero quo mollitia id, delectus ut. Suscipit mollitia facilis ipsum, iure voluptatem.\\n\\nAmet vero numquam, quisquam, praesentium esse quas vitae. Veritatis deserunt cum harum doloremque odio aliquid tenetur quos dolor, libero placeat sed, explicabo, minima similique repellendus modi quaerat voluptates itaque ducimus dolore laboriosam cumque ipsum. Nemo eius officia iure, voluptatum voluptas enim saepe porro id rerum ab omnis dicta alias, maiores quos rem officiis assumenda provident autem facere culpa itaque nihil! \\n\\n\"},{\"attributes\":{\"underline\":true,\"italic\":true,\"color\":\"#444444\",\"bold\":true},\"insert\":\"Impedit eaque quis dolorum, magnam quas. Aliquam, iusto.\"},{\"insert\":\"\\n\"}]}', 'http://www.polskiezabytki.pl/img/71/7132/20120614102852_9f3764d3121d4aa3cf916828c5f0b28b.jpg', 'https://pl.wikipedia.org/wiki/Zamek', 50.1537, 23.1297),
(6, 'Pomnik Lotników Polskich', 'Pomnik Lotników Polskich poległych w II wojnie światowej', 'grave', '{\"ops\":[{\"insert\":\"Deleniti sequi ipsa\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"insert\":\"\\nNesciunt hic quisquam similique eligendi eveniet corrupti, illo voluptates modi incidunt culpa id. Eligendi, deserunt commodi qui quaerat provident sapiente ea ad praesentium obcaecati aspernatur nostrum.\\n\\n\"},{\"attributes\":{\"italic\":true},\"insert\":\"Voluptatum dolores ratione, possimus quia nam animi perspiciatis quas. Natus error perspiciatis repellat eligendi! Atque obcaecati eos nobis \"},{\"insert\":\"\\n\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"Recusandae dolorum ipsa\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nVeniam molestias voluptate quod, voluptatibus, eaque accusamus voluptates possimus! Iure quae corporis blanditiis, commodi in incidunt excepturi esse maxime, possimus.\\n\\n\"},{\"attributes\":{\"color\":\"#f06666\",\"bold\":true},\"insert\":\"Quas repellat doloremque molestiae\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"underline\":true},\"insert\":\"Ratione assumenda doloribus\"},{\"attributes\":{\"header\":2},\"insert\":\"\\n\"},{\"insert\":\"\\nNisi magnam recusandae, amet eos obcaecati iste saepe! Possimus dignissimos fuga voluptatem, quasi deserunt omnis temporibus, iusto aliquid a ad cum maxime similique sit doloribus minima molestiae magni fugiat libero rem tempore vero quo mollitia id, delectus ut. Suscipit mollitia facilis ipsum, iure voluptatem.\\n\\nAmet vero numquam, quisquam, praesentium esse quas vitae. Veritatis deserunt cum harum doloremque odio aliquid tenetur quos dolor, libero placeat sed, explicabo, minima similique repellendus modi quaerat voluptates itaque ducimus dolore laboriosam cumque ipsum. Nemo eius officia iure, voluptatum voluptas enim saepe porro id rerum ab omnis dicta alias, maiores quos rem officiis assumenda provident autem facere culpa itaque nihil! \\n\\n\"},{\"attributes\":{\"underline\":true,\"italic\":true,\"color\":\"#444444\",\"bold\":true},\"insert\":\"Impedit eaque quis dolorum, magnam quas. Aliquam, iusto.\"},{\"insert\":\"\\n\"}]}', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Pomnik_lotnikow_pl.jpg', 'https://pl.wikipedia.org/wiki/Pomnik_Lotnik%C3%B3w_Polskich', 50.1594, 23.1289);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

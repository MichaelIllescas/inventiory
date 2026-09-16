-- =====================================================================
-- V1 - Esquema inicial de Inventiory
--
-- Refleja el modelo JPA existente al momento de adoptar Flyway.
-- A partir de aca, todo cambio de esquema va en una migracion nueva
-- (V2__, V3__, ...). Este archivo no se edita nunca mas.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Usuarios
-- ---------------------------------------------------------------------
CREATE TABLE usuarios (
    id                bigint       NOT NULL AUTO_INCREMENT,
    first_name        varchar(255) NOT NULL,
    last_name         varchar(255) NOT NULL,
    email             varchar(255) NOT NULL,
    password          varchar(255) NOT NULL,
    document_number   varchar(255) NOT NULL,
    phone             varchar(255) NOT NULL,
    address           varchar(255) NOT NULL,
    role              enum('ADMIN','USER'),
    subscription      enum('FREE','PRO') NOT NULL,
    enabled           bit          NOT NULL,
    registration_date date         NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_usuarios_email UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE reset_token (
    id          bigint NOT NULL AUTO_INCREMENT,
    user_id     bigint,
    token       varchar(255),
    expiry_date datetime(6),
    PRIMARY KEY (id),
    CONSTRAINT uk_reset_token_user UNIQUE (user_id),
    CONSTRAINT fk_reset_token_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Datos del comercio
-- ---------------------------------------------------------------------
CREATE TABLE companies (
    id                        bigint       NOT NULL AUTO_INCREMENT,
    user_id                   bigint       NOT NULL,
    name                      varchar(100) NOT NULL,
    business_address          varchar(255) NOT NULL,
    tax_identification_number varchar(11)  NOT NULL,
    email                     varchar(100),
    phone                     varchar(15),
    registration_date         date,
    update_date               date,
    PRIMARY KEY (id),
    CONSTRAINT uk_companies_user UNIQUE (user_id),
    CONSTRAINT uk_companies_tax_id UNIQUE (tax_identification_number),
    CONSTRAINT fk_companies_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Catalogo
-- ---------------------------------------------------------------------
CREATE TABLE brands (
    id   bigint       NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_brands_name UNIQUE (name)
) ENGINE=InnoDB;

CREATE TABLE products (
    id                  bigint        NOT NULL AUTO_INCREMENT,
    user_id             bigint        NOT NULL,
    brand_id            bigint,
    code                varchar(50)   NOT NULL,
    name                varchar(100)  NOT NULL,
    description         varchar(255),
    category            varchar(100),
    sale_price          decimal(10,2) NOT NULL,
    previous_sale_price decimal(10,2),
    stock               decimal(10,3) NOT NULL,
    min_stock           decimal(38,2) CHECK (min_stock >= 0),
    state               bit,
    registration_date   date,
    updated_date        date,
    last_price_update   date,
    PRIMARY KEY (id),
    CONSTRAINT fk_products_user FOREIGN KEY (user_id) REFERENCES usuarios (id),
    CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Terceros
-- ---------------------------------------------------------------------
CREATE TABLE clients (
    id                bigint       NOT NULL AUTO_INCREMENT,
    user_id           bigint       NOT NULL,
    name              varchar(100) NOT NULL,
    lastname          varchar(100) NOT NULL,
    document_number   varchar(255) NOT NULL,
    lax_id            varchar(255),
    email             varchar(100),
    phone             varchar(255),
    address           varchar(255),
    active            bit,
    registration_date date,
    update_date       date,
    PRIMARY KEY (id),
    CONSTRAINT fk_clients_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

CREATE TABLE providers (
    id                bigint       NOT NULL AUTO_INCREMENT,
    user_id           bigint       NOT NULL,
    name              varchar(100) NOT NULL,
    business_name     varchar(150),
    tax_id            varchar(255),
    contact_person    varchar(100),
    email             varchar(100),
    phone             varchar(255),
    website           varchar(100),
    address           varchar(255),
    notes             varchar(500),
    state             bit,
    registration_date date,
    update_date       date,
    PRIMARY KEY (id),
    CONSTRAINT uk_providers_name UNIQUE (name),
    CONSTRAINT fk_providers_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Compras (ingreso de stock)
-- ---------------------------------------------------------------------
CREATE TABLE purchases (
    id              bigint        NOT NULL AUTO_INCREMENT,
    product_id      bigint        NOT NULL,
    provider_id     bigint        NOT NULL,
    registred_by    bigint        NOT NULL,
    purchase_date   date          NOT NULL,
    purchase_price  decimal(10,2) NOT NULL,
    quantity        decimal(38,2) NOT NULL CHECK (quantity >= 1),
    remaining_stock decimal(38,2) NOT NULL,
    notes           varchar(500),
    state           bit           NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_purchases_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_purchases_provider FOREIGN KEY (provider_id) REFERENCES providers (id),
    CONSTRAINT fk_purchases_user FOREIGN KEY (registred_by) REFERENCES usuarios (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Ventas
-- ---------------------------------------------------------------------
CREATE TABLE sale (
    id                      bigint        NOT NULL AUTO_INCREMENT,
    user_id                 bigint        NOT NULL,
    customer_id             bigint,
    sale_date               date          NOT NULL,
    payment_method          enum('BANK_TRANSFER','CASH','CREDIT_CARD','DEBIT_CARD','OTHER') NOT NULL,
    status                  enum('CANCELED','CONFIRMED','PENDING') NOT NULL,
    total_sale              decimal(38,2) NOT NULL,
    total_cost              decimal(38,2) NOT NULL,
    gross_profit            decimal(38,2) NOT NULL,
    net_profit              decimal(38,2) NOT NULL,
    discount_applied        decimal(38,2) NOT NULL,
    extra_charge_percentage decimal(38,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_sale_user FOREIGN KEY (user_id) REFERENCES usuarios (id),
    CONSTRAINT fk_sale_customer FOREIGN KEY (customer_id) REFERENCES clients (id)
) ENGINE=InnoDB;

CREATE TABLE sale_detail (
    id         bigint        NOT NULL AUTO_INCREMENT,
    sale_id    bigint        NOT NULL,
    product_id bigint        NOT NULL,
    quantity   decimal(38,2) NOT NULL,
    sale_price decimal(38,2) NOT NULL,
    cost_price decimal(38,2) NOT NULL,
    subtotal   decimal(38,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_sale_detail_sale FOREIGN KEY (sale_id) REFERENCES sale (id),
    CONSTRAINT fk_sale_detail_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Gastos
-- ---------------------------------------------------------------------
CREATE TABLE expenses (
    id             bigint       NOT NULL AUTO_INCREMENT,
    user_id        bigint       NOT NULL,
    expense_type   varchar(100) NOT NULL,
    description    varchar(255),
    amount         float(53)    NOT NULL,
    payment_method varchar(50)  NOT NULL,
    date           date         NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES usuarios (id)
) ENGINE=InnoDB;

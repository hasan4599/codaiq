export type StripeSubscription = {
    id: string;
    object: "subscription";
    application: null;
    application_fee_percent: null;
    automatic_tax: {
        disabled_reason: string | null;
        enabled: boolean;
        liability: string | null;
    };
    billing_cycle_anchor: number;
    billing_cycle_anchor_config: any | null;
    billing_mode: {
        type: "classic";
    };
    billing_thresholds: null;
    cancel_at: number | null;
    cancel_at_period_end: boolean;
    canceled_at: number | null;
    cancellation_details: {
        comment: string | null;
        feedback: string | null;
        reason: string | null;
    };
    collection_method: "charge_automatically";
    created: number;
    currency: string;
    customer: string;
    days_until_due: number | null;
    default_payment_method: {
        id: string;
        object: "payment_method";
        allow_redisplay: string;
        billing_details: {
            address: {
                city: string | null;
                country: string | null;
                line1: string | null;
                line2: string | null;
                postal_code: string | null;
                state: string | null;
            };
            email: string;
            name: string;
            phone: string | null;
            tax_id: string | null;
        };
        card: {
            brand: string;
            checks: {
                address_line1_check: string | null;
                address_postal_code_check: string | null;
                cvc_check: string;
            };
            country: string;
            display_brand: string;
            exp_month: number;
            exp_year: number;
            fingerprint: string;
            funding: string;
            generated_from: null;
            last4: string;
            networks: {
                available: string[];
                preferred: string | null;
            };
            regulated_status: string;
            three_d_secure_usage: {
                supported: boolean;
            };
            wallet: null;
        };
        created: number;
        customer: string;
        livemode: boolean;
        metadata: Record<string, string>;
        type: "card";
    } | null;
    default_source: null;
    default_tax_rates: any[];
    description: string | null;
    discounts: any[];
    ended_at: number | null;
    invoice_settings: {
        account_tax_ids: null;
        issuer: {
            type: "self";
        };
    };
    items: {
        object: "list";
        data: Array<{
            id: string;
            object: "subscription_item";
            billing_thresholds: null;
            created: number;
            current_period_end: number;
            current_period_start: number;
            discounts: any[];
            metadata: Record<string, string>;
            plan: {
                id: string;
                object: "plan";
                active: boolean;
                amount: number;
                amount_decimal: string;
                billing_scheme: string;
                created: number;
                currency: string;
                interval: "month" | "year";
                interval_count: number;
                livemode: boolean;
                metadata: Record<string, string>;
                meter: null;
                nickname: string | null;
                product: string;
                tiers_mode: string | null;
                transform_usage: null;
                trial_period_days: number | null;
                usage_type: "licensed" | string;
            };
            price: {
                id: string;
                object: "price";
                active: boolean;
                billing_scheme: string;
                created: number;
                currency: string;
                custom_unit_amount: null;
                livemode: boolean;
                lookup_key: string | null;
                metadata: Record<string, string>;
                nickname: string | null;
                product: string;
                recurring: {
                    interval: "month" | "year";
                    interval_count: number;
                    meter: null;
                    trial_period_days: number | null;
                    usage_type: "licensed" | string;
                };
                tax_behavior: string;
                tiers_mode: string | null;
                transform_quantity: null;
                type: "recurring";
                unit_amount: number;
                unit_amount_decimal: string;
            };
            quantity: number;
            subscription: string;
            tax_rates: any[];
        }>;
        has_more: boolean;
        total_count: number;
        url: string;
    };
    latest_invoice: string;
    livemode: boolean;
    metadata: Record<string, string>;
    next_pending_invoice_item_invoice: null;
    on_behalf_of: null;
    pause_collection: null;
    payment_settings: {
        payment_method_options: {
            acss_debit: null;
            bancontact: null;
            card: {
                network: string | null;
                request_three_d_secure: string;
            };
            customer_balance: null;
            konbini: null;
            sepa_debit: null;
            us_bank_account: null;
        };
        payment_method_types: string[];
        save_default_payment_method: "off" | "on_subscription" | string;
    };
    pending_invoice_item_interval: null;
    pending_setup_intent: null;
    pending_update: null;
    plan: {
        id: string;
        object: "plan";
        active: boolean;
        amount: number;
        amount_decimal: string;
        billing_scheme: string;
        created: number;
        currency: string;
        interval: "month" | "year";
        interval_count: number;
        livemode: boolean;
        metadata: Record<string, string>;
        meter: null;
        nickname: string | null;
        product: string;
        tiers_mode: null;
        transform_usage: null;
        trial_period_days: number | null;
        usage_type: string;
    };
    quantity: number;
    schedule: null;
    start_date: number;
    status: "active" | "canceled" | "incomplete" | "incomplete_expired" | "past_due" | "trialing" | "unpaid";
    test_clock: null;
    transfer_data: null;
    trial_end: number | null;
    trial_settings: {
        end_behavior: {
            missing_payment_method: "create_invoice" | string;
        };
    };
    trial_start: number | null;
    invoice_pdf_url: string;
};
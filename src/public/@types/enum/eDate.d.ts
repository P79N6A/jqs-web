/**
 * Created by garrettzhou@2018-8-1
 * date常用枚举
 */
declare namespace eDate {
    const enum DayCount {
        TwoWeek = 14
    }

    const enum MillisecondCount {
        OneSecond = 1000,

        FiveSecond = 5000,
        ThirySecond = 30000,

        FiveMinute = 300000,

        OneHour = 3600000,

        OneDay = 86400000,

        Chiliad = 525600000000
    }

    const enum SecondCount {
        OneHour = 3600,
        OneDay = 86400
    }

    const enum Timespan {
        PromiseTimeout = MillisecondCount.FiveSecond,
        RequestTimeout = 60000
    }

    const enum Per {
        MicrosecondPerMs = 1000,
        MsPerSecond = 1000,
        SecondPerMin = 60,
        MinPerHour = 60,
        HourPerDay = 24
    }
}
